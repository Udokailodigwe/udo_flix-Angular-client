/** 
 * The FavoriteMoviesComponent is used to display the movies saved to a user's favouriteMovies list. 
 * The cards display the title, director and an image of the movie and contain buttons that can be opened 
 * to display dialogs with further information about the director or genre, or a synopsis. Movies can be added to or removed from favourites by clicking on a heart icon contained in the top right corner 
 * of each card. The heart colour toggles accordingly to reflect the movie's status.
 * @module FavoriteMoviesComponent
 */

import { Component, OnInit } from '@angular/core';

      //Utilized Angular Materials
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';  //ApiData Services through HttpClient

      //Utilized components
import { GenreComponent } from '../genre/genre.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { DirectorComponent } from '../director/director.component';


@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.scss']
})
export class FavoriteMoviesComponent implements OnInit {
  
  user: any = {};
  favorites: any = [];

  /**
   * Called when creating an instance of the class
   * @param fetchApiData
   * @param dialog
   * @param snackBar
  */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getUserMovies();
  }

  /** 
   * Invokes the getUser method on the fetchApiData service and populates this.user object with the response. 
   * @function getUser
   * @returns an object with the user details
   */
    getUser(): void {
      const userString: any = localStorage.getItem('user');
      let username = JSON.parse(userString)
      this.fetchApiData.getUsersProfile(username?.username).subscribe((response: any) => {
          console.log(response);
          this.user = response;
          return this.user;
      });
  }

/** 
   * Invokes the getUserMovies method on the fetchApiData service and populates this.favorites object with the response. 
   * @function getUser
   * @returns an object with the user details
   */
    getUserMovies(): void {
        this.fetchApiData.getAllMovies().subscribe((response: any) => {
          this.favorites = response.filter((movie: any) => {
            return this.user.favoriteMovies.includes(movie._id)
        });
            console.log(this.favorites);
              return this.favorites;
        })
    }

    /**
   * Function to remove a certain movie object from the user's favouriteMovies list using an Api call.
   * A popup will appear stating that the movie was deleted from the user's favourites. Page gets reloaded to update the UI.
   * @function deleteFavouriteMovies
   * @param movieId the id of the movie chosen by the user
   * @param title the title of the movie chosen by the user
   * @returns the function getUserMovies() 
   */
  deleteFavoriteMovie(movieId: string, title: string): void{
      this.fetchApiData.deleteFavoriteMovies(movieId).subscribe(() => {
        this.snackBar.open(`${title} has been deleted from your favorites!`, 'OK',{
          duration: 3000
        });
        window.location.reload();
        this.ngOnInit();
      });
      return this.getUserMovies();
    }


    /**
   * Function to search through genres array and find a match to the MovieID.
   * Opens a dialog to display the genre component, passing it the data it needs to display inside the data object.
   * @function openGenreDialog
   * @param name name of genre of the selected movie
   * @param description genre description of the selected movie
   */
  openGenreDialog(name: string, description: string): void{
      this.dialog.open(GenreComponent, {
        data: {name, description}, 
        width: '500px',
      });
    }

      /**
   * Open a dialog to display the director component, passing it the data it needs to display inside the data object.
   * @function openDirectorDialog
   * @param name name of the director of the selected movie.
   * @param bio bio of the director.
   */
    openDirectorDialog(name: string, bio: string){
      this.dialog.open(DirectorComponent, {
        data: {name, bio},
        width: '600px'
      })
    }

    /**
   * Opens a dialog to display the synopsis component, passing it the data it needs to display inside the data object.
   * @function openSynopsisDialog
   * @param name title of the selected movie.
   * @param description description of the selected movie
   */
    openSynopsisDialog(name: any, description: any){
      this.dialog.open(SynopsisComponent, {
        data: {name, description},
        width: '600px'
      })
    }

}
