import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'udo_flix-Angular-client';

  constructor(
    public dialog: MatDialog
  ) {}
//open up dialog when sign up button is clicked
  openRegistrationDialog() {
    this.dialog.open(RegistrationFormComponent, {
      width: '300px',
      //panelClass: 'myClass' 
    });
  }
  //open up dialog when login button is clicked
  openLoginDialog () {
    this.dialog.open(LoginFormComponent, {
      width: '300px',
      //panelClass: 'myClass' 
    }) 
  }
}
