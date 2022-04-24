/**
 * The FetchApiDataService class is used to make Http requests to the udo_flix backend Api to retrieve data on movies and
 * users that is used within the app, as well as to register and login users, update their details, and
 * to add or remove movies from their favourites. The class is marked with the Injectable decorator and
 * injected as a dependency to the root component, thereby making the service available to all the other
 * components.
 * @module FetchApiDataService
 */

// Provides the service as an injectable dependency to the root app
import { Injectable } from '@angular/core';

// Used to make Http requests to the Api
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

//Observable are used when requesting async functions similar to promises in js
import { Observable, catchError, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//declaring the api url that will provide data for the client app
const apiUrl = 'https://udo-flix.herokuapp.com/';

//this decorator will make this service available to all components
@Injectable({
  providedIn: 'root'
})


export class FetchApiDataService  {
  
  /**
   * * Inject the HttpClient module to the constructor params.
   * This will provide HttpClient to the entire class, making it available via "this.http"
   * @param http
   */
  constructor(
      private http: HttpClient
    ) { } 

    /** 
   * Function to register users by making an API call to the users registration endpoint (POST /users).
   * @function registerUser
   * @param userDetails an object with user details ( username, email, password, birthdate)
   * @returns an object with all user details in json format
   */
  public registerUser(userDetails: any): Observable<any> { 
      console.log(userDetails);
      return this.http.post(apiUrl + 'users', userDetails).pipe(
        catchError(this.handleError)
    );
  }

    /**
   * Function to get a list of all movies by making an API call to the movies endpoint (GET /movies).
   * Create new httpheader to send alongside with token to api during call
   * Call requires user authentication via a bearer token
   * @function getAllMovies
   * @return an array with all movies in json format
   */
  public getAllMovies(): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
        map(this.extractResponseData),//map extracted movies with extractResponseData returned function
        catchError(this.handleError)
    );
  }

  /**
   * Function to login users by making an API call to the users login endpoint (POST /login).
   * @function userLogin
   * @param userDetails (username, password)
   * @returns an object with all user details in json format
   */
    public userLogin(userDetails: object): Observable<any> {
        return this.http.post(apiUrl + 'login', userDetails).pipe(
          catchError(this.handleError)
      );
    }


    // //Making the api call to get a single movie endpoint
    // public getSingleMovie(): Observable<any> {
    //   const token = localStorage.getItem('token');
    //   return this.http.get(apiUrl + 'movies/:title', {headers: new HttpHeaders({
    //     Authorization: 'Bearer ' + token,
    //   })
    // }).pipe(
    //     map(this.extractResponseData),
    //     catchError(this.handleError)
    //   );
    // }


/**
   * Function to get details about a director by making an API call to the movies/director/:name endpoint (GET /movies/director/:name).
   * Call requires user authentication via a bearer token
   * @function getDirector
   * @returns an object with director details in json format
   */    
  public getDirector(): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'director/:name', {headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    /**
   * Function to get a list of all genres by making an API call to the genres endpoint (GET /genres).
   * Call requires user authentication via a bearer token
   * @function getGenres
   * @returns an array with all genres in json format
   */
    public getGenre(): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'genre/:name', {headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    /**
   * Function to get user details of a specific user by making an API call to the users/:username endpoint (GET /users/:username).
   * username is retrieved from localStorage. 
   * Call requires user authentication via a bearer token
   * @function getUsersProfile
   * @returns an object with user information in json format
   */
      public getUsersProfile(username: any): Observable<any> {
        const token = localStorage.getItem('token');
        console.log(username);
        return this.http.get(apiUrl + `users/${username}`, {headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
      })
    }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    //Making the api call to get users endpoint
    //   public getUser(username: any): Observable<any> {
    //     const token = localStorage.getItem('token');
    //     //console.log(username);
    //     return this.http.get(apiUrl + 'users', {headers: new HttpHeaders({
    //     Authorization: 'Bearer ' + token,
    //   })
    // }).pipe(
    //     map(this.extractResponseData),
    //     catchError(this.handleError)
    //   );
    // }

    // public getUsersFavoriteMovies(username: any): Observable<any> {
    //   const token = localStorage.getItem('token');
    //   return this.http.get(apiUrl + `users/${username}`, {headers: new HttpHeaders({
    //     Authorization: 'Bearer ' + token,
    //   })
    // }).pipe(
    //     map(this.extractResponseData),
    //     catchError(this.handleError)
    //   );
    // }

        /**
   * Function to add a movie object to a specific user's favouriteMovies by making an API call to the users/:username/movies/:movieId endpoint (POST /users/:username/movies/:movieId).
   * username is retrieved from localStorage. 
   * Call requires user authentication via a bearer token
   * @function addFavouriteMovies
   * @param movieId the _id of a movie the user wishes to add to their favourites list
   * @returns an updated user object with the newly added movie object to FavouriteMovies
   */
    public addFavoriteMovie(movieId: string): Observable<any> {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('user');
      return this.http.post(apiUrl + `users/${username}/movies/${movieId}`, null, {
        headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
      })
    }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    /**
   * Function to edit the user details for a specific user by making an API call to the users/:username endpoint (PUT /users/:username).
   * username is retrieved from localStorage. 
   * Call requires user authentication via a bearer token
   * @function editUserProfile
   * @param userDetails an object with the newly edited user details ( username, email, password, birthdate)
   * @returns an object with the updated user data in json format
   */
    public editUserProfile(userDetails: object): Observable<any> {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('user');
      return this.http.put(apiUrl + `users/${username}`, userDetails, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
      })
    }).pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
    }

    /**
   * Function to remove a movie object from a specific user's favouriteMovies by making an API call to the users/:username/movies/:movieId endpoint (DELETE /users/:username/movies/:movieId).
   * username is retrieved from localStorage. 
   * Call requires user authentication via a bearer token
   * @function deleteFavouriteMovie
   * @param movieId the _id of a movie the user wishes to remove from their favourites list
   * @returns an updated user object with the newly removed movie object from FavouriteMovies
   */
    public deleteFavoriteMovies(movieId: any): Observable<any> {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('user');
      return this.http.delete(apiUrl + `users/${username}/movies/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }).pipe(
          map(this.extractResponseData), 
          catchError(this.handleError)
    );
  }

  /**
   * Function to delete a user by making an API call to the users/:username endpoint (DELETE /users/:username).
   * username is retrieved from localStorage. 
   * Call requires user authentication via a bearer token
   * @function deleteUserProfile
   * @returns delete user profile
   */
    public deleteUserProfile(): Observable<any> {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      return this.http.delete(apiUrl + `users/${user}`, {headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }).pipe(
          map(this.extractResponseData), 
          catchError(this.handleError)
      );
  }

  
/**
 * Takes a request response and returns either the response body or an empty object.
 * A non-typed responseData extracted from api during http calls
 * @param res The response to an Http request.
 * @returns Either the response or an empty object.
 */
  private extractResponseData (res: any | object): any {
      const body = res;
      return body || {};
  }

  /**
 * Handles error responses to Http requests.
 * for errors and failures during calls and will be returned during or after excution of calls
 * @param error The HttpErrorResponse returned on the Observable's response stream.
 * @returns An observable that errors with the specified message.
 */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}