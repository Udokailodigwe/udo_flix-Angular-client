import { Component, OnInit, Input} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
    //bind form input values to the user login data object with the @input decorator
  @Input() loginData = {username: '', password: ''};

  constructor(
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar, 
  ) { }

  ngOnInit(): void {
  }

  /**
   * Function for sending the form input to the backend to log user in and store credential in localStorage
   * @param return
  */
    logUserIn () {
      this.fetchApiData.userLogin(this.loginData).subscribe((response) => {
        console.log(response);
        //store login credentials on local storage
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.users._id);
        localStorage.setItem('user', JSON.stringify(response));
        this.dialogRef.close(); //close dialog on successful login
        console.log(response);
        this.snackBar.open('User logged in successfully!', 'OK',{
          duration: 3000,
          verticalPosition: 'top'
        });
      }, (response) => {
        console.log(response);
        this.snackBar.open('Login  unsuccessful', 'Please check Username and Password', {
          duration: 3000,
          verticalPosition: 'top'
        });
    }); 
  }
}
