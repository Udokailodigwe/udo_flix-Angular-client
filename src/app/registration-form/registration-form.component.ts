import { Component, OnInit, Input} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})

export class RegistrationFormComponent implements OnInit {
  //bind the form input values to the user data object with the @input decorator
  @Input() userData = {username: '', password: '', email: '', birthday: '' };

  /**
   * Called when creating an instance of the class
   * @param fetchApiData
   * @param dialogRef
   * @param snackBar
  */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<RegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  /**
   * Function for sending the form input to the backend to create new user
   * @param return
  */
  createNewUser() {
      this.fetchApiData.registerUser(this.userData).subscribe((response) => {
      this.dialogRef.close(); //on success, close dialogModal
      console.log(response);
      this.snackBar.open('Registration successfully', 'OK', {
        duration: 3000,
        verticalPosition: 'top'
      });
    }, (response) => {
      console.log(response);
      this.snackBar.open(response, 'OK',{
        duration: 3000,
        verticalPosition: 'top'
      });
    });
  }
}
