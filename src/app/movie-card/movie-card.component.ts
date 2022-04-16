import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {

  movies: any[] = []; //An empty array to hold the called movies from the api

  constructor(
    public fetchApiData: FetchApiDataService
  ) { }
  

  ngOnInit(): void {
    this.getMovies();
  }

  //fetch all movies from the api through FetchApiDataService 
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response; //save the subscribed response to movies as vaiarble
      console.log(response);
      return this.movies
    })
  }
}
