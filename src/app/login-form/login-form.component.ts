/** 
 * The LoginFormComponent is used to render a mat dialog containing a form where the
 * user can submit their credentials to log in to udo_flix.
 * @module LoginFormComponent
 */

import { Component, OnInit, Input} from '@angular/core';

          //Utilized Angular Materials
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';        //Used to route app paths
import { FetchApiDataService } from '../fetch-api-data.service';  //ApiData Services through HttpClient


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

    /**
   * input values bound to userData using ngMdoel
   */  
    @Input() loginData = {username: '', password: ''};

    /**
   * Called when creating an instance of the class
   * @param fetchApiData
   * @param router
   * @param snackBar
   * @param dialogRef
  */
  constructor(
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar, 
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Invokes the userLogin method on the fetchApiData service, with the loginData from the form in order to log in the user. A successful login closes the form and navigates the user to the
   * movies route. A popup is displayed confirming login success. If unsuccessful, a popup message
   * asks the user to check their username and password.
   */
    logUserIn () {
      this.fetchApiData.userLogin(this.loginData).subscribe((response) => {
        console.log(response);
        //store login credentials on local storage
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.users._id);
        localStorage.setItem('user', JSON.stringify(response.users));//stringify data stored in browser
        this.dialogRef.close(); //close dialog on successful login
        console.log(response);
        this.snackBar.open(`${this.loginData.username} logged in successfully!`, 'OK',{
          duration: 3000,
          verticalPosition: 'top'
        });
        this.router.navigate(['movies']);//onlogin, navigate to movieCard component, via router library
      }, (response) => {
        console.log(response);
        this.snackBar.open('Login  unsuccessful', 'Please check Username and Password', {
          duration: 3000,
          verticalPosition: 'top'
        });
    }); 
  }
}
