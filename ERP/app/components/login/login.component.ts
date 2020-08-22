import { SharedService } from './../../services/shared.service';
import { DataService } from './../../data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  userName = '';
  password = '';
  allUsers = [];
  loginError = false;

  constructor( private data: DataService, private router: Router, private shared: SharedService ) {
    //get all users
    this.allUsers = data.userList;
   }

  login() {
    //travel list of users
    //compare each user credentials with values from the form

    var found = false;
    for(let i=0; i < this.allUsers.length; i++){
      var user = this.allUsers[i];
      if(user.userName.toLowerCase() == this.userName.toLowerCase() && user.password == this.password){
        console.log("logged in!");
        found = true;
        this.loginError = false;

        this.shared.isUserLoggedIn = true;
        this.shared.userName = user.userName;

        //send user to register page
        this.router.navigate(['/user/register']);
      }
    }

    if(!found){
      console.error("Wrong credentials");
      this.loginError = true;
    }
  }
}
