/** 
  *This RegistrationFormComponent is used to render a mat dialog containing a mat form field, that collects users details.
  *This section also allows users to create a profile, using the create buttons
  *It includes:
  *  Action buttons for submitting user details. 
  * Mat form for editing user details 
 * @module RegistrationFormComponent
 */

import { Component, OnInit, Input} from '@angular/core';

    //Utilized Angular materials
import { MatDialogRef } from '@angular/material/dialog';  //Reference to opened dialog  in another component
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';  //ApiData Services through HttpClient

@Component({
    selector: 'app-registration-form',
    templateUrl: './registration-form.component.html',
    styleUrls: ['./registration-form.component.scss']
})

export class RegistrationFormComponent implements OnInit {

    /** 
   * userData values are populated by form inputs in the user-registration-form template that are 
   * bound using the ngModel directive.
   */ 
@Input() userData = {
        username: '',  
        password: '', 
        email: '', 
        birthday: '' 
    };

/**
 * Called when creating an instance of the class
 * @param fetchApiData
 * @param dialogRef
 * @param snackBar
 */
constructor(
public fetchApiData: FetchApiDataService,
        // Creates a reference to the dialog that contains the UserRegistrationForm component
    public dialogRef: MatDialogRef<RegistrationFormComponent>,
    public snackBar: MatSnackBar
) { }

ngOnInit(): void {
}

/**
   * @function createNewUser
   * Invokes the userRegistration method on the fetchApiData service, with the userData from the form,
   * in order to register the user. Successful registration closes the form. 
   * If unsuccessful, a popup message will ask the user to try again with a different username.
   */
createNewUser() {
this.fetchApiData.registerUser(this.userData).subscribe((response) => {
    this.dialogRef.close(); //on success, close dialogModal
    console.log(response);
    this.snackBar.open('Registration successfully',  'OK', {
        duration: 3000,
        verticalPosition: 'top'
});
});
this.snackBar.open('Sorry, registration was unsuccessful', 'Please try a different username', {
        duration: 3000
    });
}
}


