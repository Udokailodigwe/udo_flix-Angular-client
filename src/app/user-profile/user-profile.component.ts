/** 
  *This UserProfileComponent is used to render a mat card displaying the profile details of the user on a form.
  *This section also allows users to update and delete their profile, using the relevant buttons.
  *It includes:
  *  Action buttons for submitting user details to store in the browser or delete from browser. 
  * Mat form for displaying and editing user details 
 * @module UserProfileComponent
 */

import { Component, OnInit, Input  } from '@angular/core';

    //Utilized Angular Material 
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';                    //Used to route app paths
import { FetchApiDataService } from '../fetch-api-data.service';  //ApiData Services through HttpClient

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {

  userString: any = localStorage.getItem('user');
  username = JSON.parse(this.userString);

  currentUser: any = null;

  
  /**
   * input values bound to userData using ngMdoel
   */
  @Input() userData = {
      username: this.username.username,
      password: '',
      email: this.username.email,
      birthday: this.username.birthday
  };
  
/**
   * Called when creating an instance of the class
   * @param fetchApiData
   * @param router
   * @param snackBar
  */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  /**
   * Calls the getUser method as soon as the component loads so that the data can be used to populate the template.
   */ 
  ngOnInit(): void {
    this.getUser();
  }
  
  /** 
   * Invokes the getUser method on the fetchApiData service and populates this.currentUser object with the response. 
   * @function getUser
   * @returns an object with the user details
   */
  getUser(): void {
      this.fetchApiData.getUsersProfile(this.username?.username).subscribe((response: any) => {
        this.currentUser = response;
        console.log(this.currentUser);
        console.log(this.username);
    });
  }

  /**
   * Takes userData from the bound input form and invokes editUserProfile method on the fetchApiData service to update user object.
   * If successful, snackBar pops up to confirm action
   * Updates user object saves in localStorage.
   * @function editUser
   * @returns an object with the updated user details
   */
  editUser(): void{
    console.log(this.userData);
    this.fetchApiData.editUserProfile(this.userData).subscribe((response) => {
      console.log(response)
      localStorage.setItem('user', JSON.stringify(response));      //store the updated credentials to browser
      this.snackBar.open('Your profile updated successfully', 'OK', {
          duration: 3000
        });
          setTimeout(()=>{
              window.location.reload();
          });
      });
  }

  /**
 * Users are asked if they are sure about deleting their profile. If yes, invokes the deleteUserProfile method on the fetchApiData service to deleteUser. If deregistration is successful the local storage is cleared, a sanckBar popup confirms that the profile has been removed and the user is routed back to the welcome page.
 * @function deleteUser
 * @return an empty user object
 */
  deleteUser(): void{
    if(confirm('Are you sure? This action cannot be reversed!')){
        this.fetchApiData.deleteUserProfile().subscribe((resp: any) => {
          this.snackBar.open('Account has been removed', 'OK', {
            duration: 3000,
        });
            localStorage.clear();
        });
            this.router.navigate(['/welcome'])
      }
    }
}
