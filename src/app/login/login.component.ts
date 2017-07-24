import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService, private userService:UserService, private router:Router) { }

  ngOnInit() {
  }

    /**
     * Runs the getAccesstoken method in the UserService.
     * Sets the accessToken recieved from the backend.
     * Sets login to true for routing permissions.
     * Redirects the user to the users page.
     */
    validateUser(){
        this.userService.getAccessToken()
        .subscribe(data => {
            this.userService.accessToken = data.access_token;
            this.authService.login();
            this.router.navigate(['/users']);
        });
    }


}
