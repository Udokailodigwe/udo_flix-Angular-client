/** 
 * The NavigationComponent is used to display the navigation options at the top of the page after the user has logged in. 
 * The navbar includes links to the different routes of the app: 'movies', 'favorites', 'profile' and also a button that allows users to logout.
 * @module NavigationComponent
 */

import { Component, OnInit } from '@angular/core';
    //Utilized Angular Materials
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service'; //ApiData Services through HttpClient


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  
  currentUser: any = null;
  
  /**
   * Called when creating an instance of the class
   * @param fetchApiData
   * @param router
   * @param snackBar
  */
  constructor(
    public router: Router,
    public snackBar: MatSnackBar,
    public fetchApiData: FetchApiDataService
  ) { }

  /**
   * Calls the getCurrentUser method as soon as the component loads so that the data can be used to populate the template.
   */ 
  ngOnInit(): void {
    this.getCurrentUser();
  }

    /** 
   * Invokes the getUser method on the fetchApiData service and populates this.currentUser object with the response. 
   * Response is stored in the currentUser object in the state
   * @function getCurrentUser
   * @returns an object with the user details
   */
  getCurrentUser(): void{
    const userString :any =   localStorage.getItem('user');         //access local storage to get user
    let username = JSON.parse(userString);              //parse data during login, to object for render
    console.log('username',username?.username)
    //input the user details gotten from the localstorage to the fetch api function to get the user details from the server
      this.fetchApiData.getUsersProfile(username?.username).subscribe((response: any)=> {
          console.log(response)
          this.currentUser = response;
          console.log(this.currentUser.username);
      });
  }

        //function to redirect user to profile page
  toProfile(){
      this.router.navigate(['/profile']);
  }

        //function to redirect user to movies page
  toMovies(){
      this.router.navigate(['/movies']);
  }

        //function redirect user to favorite movies page
  toFavorite(){
      this.router.navigate(['/favorite']);
  }

/**
   * @function logoutUser
   * function to log out a user and clear localStorage
   * snackBar notification pop up to notify confirmation
   * reroute to welcome page
   */  
  logoutUser(){
      localStorage.clear();
      this.snackBar.open(`${this.currentUser.username}, you logged out`, ' See you again', {
        duration: 2000,
        verticalPosition: 'top'
      });
      this.router.navigate(['/welcome']).then(()=> {
        window.location.reload
      });
    }
}
