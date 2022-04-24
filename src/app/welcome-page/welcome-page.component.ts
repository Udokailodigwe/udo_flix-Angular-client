/** 
  *This WelcomePageComponent is used to render welcome message for users. 
  *It includes:
  *  action buttons that displays dialog containing mat card for registering new users and logging in. 
 * @module WelcomePageComponent
 */

import { Component, OnInit } from '@angular/core';

    //Utilized Angular Material 
import { MatDialog } from '@angular/material/dialog';

    //Utilized Components within this component
import { LoginFormComponent } from '../login-form/login-form.component';
import { RegistrationFormComponent } from '../registration-form/registration-form.component';

@Component({
    selector: 'app-welcome-page',
    templateUrl: './welcome-page.component.html',
    styleUrls: ['./welcome-page.component.scss']
})

export class WelcomePageComponent implements OnInit {

  /**
   * Sets MatDialog as a property on the component class.
   * @param dialog Class used to create dialogs in which other components can be rendered.
   */ 

  constructor(
      public dialog: MatDialog       //Defined MatDialog to be used in all classes
  ) {}

  ngOnInit(): void {
  }

  /**
   * open up dialog when sign up button is clicked on its template.
   */
  openRegistrationDialog() {
      this.dialog.open(RegistrationFormComponent, {
        width: '300px',
    });
  }

/**
   * open up dialog when sign up button is clicked on its template.
   */  
  openLoginDialog () {
    this.dialog.open(LoginFormComponent, {
      width: '300px',
    }) 
  }

}
