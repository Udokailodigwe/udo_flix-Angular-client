import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorComponent } from '../director/director.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreComponent } from '../genre/genre.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {

  userFavoriteMovie: any = {};// hold users favorite movies
  movies: any[] = []; //An empty array to hold the called movies and its embedded data from the api

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }
  

  ngOnInit(): void {
    this.getMovies();
    this.getUserFavorite();
  }

  //fetch all movies from the api through FetchApiDataService 
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response; //save the subscribed response to movies as vaiarble
      console.log(response);
      return this.movies
    });
  }
  
    openGenreDialog(name: string, description: string): void{
      this.dialog.open(GenreComponent, {
        //panelClass: 'custom-dialog-container',
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

    getUserFavorite(): void{
      const userString: any = localStorage.getItem('user');
      let user = JSON.parse(userString);
      this.fetchApiData.getUsersProfile(user).subscribe((resp: any) => {
        this.userFavoriteMovie = resp.favoriteMovies;
      });
    }

    addFavoriteMovie(movieId: string, title: string): void{
      this.fetchApiData.addFavoriteMovie(movieId).subscribe((response: any) => {
        this.snackBar.open(`${title} has been added to your favorites!`, 'OK',{
          duration: 3000
        });
        this.ngOnInit();
      });
      return this.getUserFavorite();
    }

    deleteFavoriteMovie(movieId: string, title: string): void{
      this.fetchApiData.deleteFavoriteMovies(movieId).subscribe((response: any) => {
        this.snackBar.open(`${title} has been deleted from your favorites!`, 'OK',{
          duration: 3000
        });
        this.ngOnInit();
      });
      return this.getUserFavorite();
    }

    //checks if the user favoritemovie includes the selected movie's _id
    isFavorited(movieId: string): boolean{
      return this.userFavoriteMovie.includes(movieId);
    }

    toggleFavorite(movie:any): void{
      this.isFavorited(movie._id)
        ? this.deleteFavoriteMovie(movie._id, movie.Title)
        : this.addFavoriteMovie(movie._id, movie.title)
    }
  }
