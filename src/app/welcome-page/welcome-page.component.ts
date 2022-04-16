import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginFormComponent } from '../login-form/login-form.component';
import { RegistrationFormComponent } from '../registration-form/registration-form.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
  }

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
