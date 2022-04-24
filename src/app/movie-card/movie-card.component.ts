/** 
 * The MovieCardComponent is used to display the data retrieved from the movies collection of the udo_flix database, interfaced through udo_flix api. The data is looped through using the ngFor directive and each movie is rendered as
 * a mat card in the template. The cards display the title, director and an image of the movie and contain
 * buttons that can be opened to display dialogs with further information about the director, genre or a synopsis. Movies can be added to or removed from favourites by clicking on a heart icon contained
 * in the top right corner of each card. The heart colour toggles accordingly to reflect the favorite movie's status.
 * 
 * @module MovieCardComponent
 */

import { Component, OnInit } from '@angular/core';
      
        //Utilized Angular Material
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service'; //ApiData Services through HttpClient

        //Utilized Components within this component
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {

  movies: any[] = [];     //An empty array to hold the called movies and its embedded data from the api
  userFavoriteMovie: any = {};      // hold users favorite movies

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
  
    /**
   * Function to get movies,  and user favourite movies when component is initialized.
   */
  ngOnInit(): void {
      this.getMovies();
      this.getUserFavorite();
  }

  /**
   * Invokes the getAllMovies method on the fetchApiData service and populates the movies array with the response. 
   * @function getMovies
   * @return an array with all movie objects in json format
   */ 
  getMovies(): void {
      this.fetchApiData.getAllMovies().subscribe((response: any) => {
          this.movies = response; //save the subscribed response to movies state as vaiarble
          console.log(response);
          return this.movies
      });
    }
  
    /**
   * Opens a dialog to display the genre component, passing it the data it needs to display inside the data object.
   * @function openGenreDialog
   * @param name name of the genre of the selected movies
   * @param description describes the genre of the selected movies
   */
    openGenreDialog(name: string, description: string): void{
      this.dialog.open(GenreComponent, {
        //panelClass: 'custom-dialog-container',
        data: {name, description}, 
        width: '500px'
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
   * @param description description of the selected movie.
   */
    openSynopsisDialog(name: any, description: any){
      this.dialog.open(SynopsisComponent, {
        data: {name, description},
        width: '600px'
      })
    }

    /**
   * Invokes the getUserProfile method on the fetchApiData service and populates the userFavoriteMovie array with the favouriteMovies property on the response, which contains an array of the user's favourite movies.
   * @function getUserFavorite
   * @returns an array with movie objects from user's FavouriteMovies list 
   */
    getUserFavorite(): void{
        const userString: any = localStorage.getItem('user');
        let user = JSON.parse(userString);
              //   ?. is used to avoid error to be thrown during query.
        this.fetchApiData.getUsersProfile(user?.username).subscribe((resp: any) => {
            this.userFavoriteMovie = resp.favoriteMovies;
            console.log(this.userFavoriteMovie);
      });
    }

    /**
   * Invokes the addFavouriteMovie method on the fetchApiData service, to add the movie to the user's
    favouriteMovies. If successful, a popup is displayed confirming that the movie has been added. 
   * @function addFavouriteMovie
   * @param movieId _id of the selected movie.
   * @param title title of the selected movie.
   * @returns an updated array of movie objects in a user's favouriteMovies list
   */
    addFavoriteMovie(movieId: string, title: string): void{
      this.fetchApiData.addFavoriteMovie(movieId).subscribe((response: any) => {
        console.log(response);
        this.snackBar.open(`${title} has been added to your favorites!`, 'OK',{
          duration: 3000
        });
        this.ngOnInit();
      });
      return this.getUserFavorite();
    }

    /**
   * Invokes the deleteFavoriteMovie method on the fetchApiData service, to delete the movie from the user's FavouriteMovies. If successful, a popup is displayed confirming that the movie has been deleted. 
   * @function deleteFavouriteMovie
   * @param movieId _id of the selected movie.
   * @param title Title of the selected movie.
   * @returns an updated array of movie objects in a user's favouriteMovies list
   */
    deleteFavoriteMovie(movieId: string, title: string): void{
        this.fetchApiData.deleteFavoriteMovies(movieId).subscribe((response: any) => {
          console.log(response);
          this.snackBar.open(`${title} has been deleted from your favorites!`, 'OK',{
            duration: 3000
          });
          this.ngOnInit();
        });
        return this.getUserFavorite();
    }

    /**
   * Function that checks if the user's favouriteMovies list includes the selected movie's _id
   * @param movieId _id of the selected movie.
   * @returns true or false
   */
    isFavorited(movieId: string): boolean{
        console.log(movieId);
        return this.userFavoriteMovie.includes(movieId);
    }

    /**
   * Function to add/delete favourite movie to/from favouriteMovies list.
   * If the movie is not on the favorite list, call @function addFavouriteMovie.
   * If the movie is already on the user favorite list, call @function deleteFavouriteMovie.
   * @param movie the selected movie object
   * @returns addFavouriteMovie or deleteFavouriteMovie functions.
   */
    toggleFavorite(movie:any): void{
        this.isFavorited(movie._id)
          ? this.deleteFavoriteMovie(movie._id, movie.title)
          : this.addFavoriteMovie(movie._id, movie.title)
    }
  }
