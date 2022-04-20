import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  
  currentUser: any = null;
  

  constructor(
    public router: Router,
    public snackBar: MatSnackBar,
    public fetchApiData: FetchApiDataService
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }
  //get current user
  getCurrentUser(): void{
    const userString :any =   localStorage.getItem('user'); //access local storage to get user
    let username = JSON.parse(userString); //convert the stringified data during login, to object for render
    console.log('username',username?.username)
    //input the user details gotten from the localstorage to the fetch api function to get the user details from the server
      this.fetchApiData.getUsersProfile(username?.username).subscribe((response: any)=> {
        console.log(response)
        this.currentUser = response;
        console.log(this.currentUser.username);
      });
  }

  toProfile(){
    this.router.navigate(['/profile']);
  }

  toMovies(){
    this.router.navigate(['/movies']);
  }

  toFavorite(){
    this.router.navigate(['/favorite']);
  }

/**
   * function to log out a user and clear localStorage
   * reroute to welcome page
   */  
  logoutUser(){
    localStorage.clear();
    this.snackBar.open('You are successfully logged out', ' OK', {
      duration: 2000,
    });
    this.router.navigate(['/welcome']).then(()=> {
      window.location.reload
    });
  }
}
