import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//declaring the api url that will provide data for the client app
const apiUrl = 'https://udo-flix.herokuapp.com/';

//this decorator will make this service available to all components
@Injectable({
  providedIn: 'root'
})


export class FetchApiDataService  {
// Inject the HttpClient module to the constructor params
  constructor(private http: HttpClient) { } // This will inject HttpClient to all class, making it available via this.http

  // Making the api call to post to the user registration endpoint
  public registerUser(userDetails: any): Observable<any> {//observable, for asynchronous operation
      console.log(userDetails);
      //post to the api endpoint of users. Using this.http will post to api and return api response
      return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  //Making the api call to get all movies endpoint
  public getAllMovies(): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders({//create new httpheader to send alongside with token to api during call
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
        map(this.extractResponseData),//map extracted movies with extractResponseData returned function
        catchError(this.handleError)
    );
  }

    //Making the api call to post to the login endpoint
    public userLogin(userDetails: any): Observable<any> {
      //console.log(userDetails);
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

    //Making the api call to get directors endpoint
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

    //Making the api call to the genre endpoint
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

    //Making the api call to get users endpoint
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

    //Making the api call to get users' favoriteMovies endpoint
    public getUsersFavoriteMovies(username: any): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + `users/${username}`, {headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    //Making the api call to the get users' favorite movie endpoint
    public addFavoriteMovie(movieid: string): Observable<any> {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('user');
      return this.http.post(apiUrl + `users/${username}/movies/${movieid}`, null, {headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    //Making the api call to the edit user's profile endpoint
    public editUserProfile(userDetails: object): Observable<any> {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('user');
      return this.http.put(apiUrl + `users/${username}`, userDetails, {headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
    }

    //Making the api call to the delete favorite movies endpoint
    public deleteFavoriteMovies(movieid: any): Observable<any> {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('user');
      return this.http.delete(apiUrl + `users/${username}/movies/${movieid}`, {headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }).pipe(
          map(this.extractResponseData), 
          catchError(this.handleError)
    );
  }

    //Making the api call to the delete favorite movies endpoint
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

    //non-typed responseData extracted from api during http calls
  private extractResponseData (data: any | object): any {
      const body = data;
      return body || {};
  }

  //for errors and failures during calls and will be returned during or after excution of calls
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