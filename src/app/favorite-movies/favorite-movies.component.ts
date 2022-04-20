import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreComponent } from '../genre/genre.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { DirectorComponent } from '../director/director.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.scss']
})
export class FavoriteMoviesComponent implements OnInit {
  user: any = {};
  favorites: any = [];

  constructor(
  
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getUserMovies();
  }

    //get current user
  getUser(): void {
    const userString: any = localStorage.getItem('user');
    let username = JSON.parse(userString)

    this.fetchApiData.getUsersProfile(username).subscribe((response: any) => {
      console.log(response);
      this.user = response;
      return this.user;
    });
  }

  //get current users movies
  getUserMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.favorites = response.filter((movie: any) => {
        return this.user.favoriteMovies.includes(movie._id)
      });
      console.log(this.favorites);
      return this.favorites;
    })
  }


  deleteFavoriteMovie(movieId: string, title: string): void{
      this.fetchApiData.deleteFavoriteMovies(movieId).subscribe((response: any) => {
        this.snackBar.open(`${title} has been deleted from your favorites!`, 'OK',{
          duration: 3000
        });
        window.location.reload();
        this.ngOnInit();
      });
      return this.getUserMovies();
    }



  openGenreDialog(name: string, description: string): void{
      this.dialog.open(GenreComponent, {
        data: {name, description}, 
        width: '500px',
        
      });
    }

    openDirectorDialog(name: string, bio: string){
      this.dialog.open(DirectorComponent, {
        data: {name, bio},
        width: '600px'
      })
    }

    openSynopsisDialog(name: any, description: any){
      this.dialog.open(SynopsisComponent, {
        data: {name, description},
        width: '600px'
      })
    }

}
