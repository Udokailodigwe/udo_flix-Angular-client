import { Component, OnInit, Input  } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userString: any = localStorage.getItem('user');
  username = JSON.parse(this.userString);
  currentUser: any = null;

  user: any = {};
  
  /**
   * input values bound to userData using ngMdoel
   */
  @Input() userData = {
      Username: this.username.username,
      Password: '',
      Email: this.username.email,
      Birthday: this.username.birthday
  };
  
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    // this.editUser();
    this.getUser();
    //this.deleteUser();
  }
  
  //get current user
  getUser(): void {
    this.fetchApiData.getUsersProfile(this.username?.username).subscribe((response: any) => {
      this.currentUser = response;
      console.log(this.currentUser?.username);
    });
  }

  editUser(): void{
    console.log(this.userData);
    this.fetchApiData.editUserProfile(this.userData).subscribe((response) => {
       localStorage.setItem('user', JSON.stringify(response)); //store the updated credentials to browser
      this.snackBar.open('Your profile updated successfully', 'OK', {
        duration: 3000
      });
        setTimeout(()=>{
          window.location.reload();
        });
    });
  }

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
