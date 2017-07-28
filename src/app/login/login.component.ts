import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { RegisterService } from '../register.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FadeInAnimationFast, FadeInAnimation } from '../_animations';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [FadeInAnimationFast, FadeInAnimation],
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService, private userService:UserService, private router:Router, private registerService:RegisterService) { }

  ngOnInit() {
  }

  loggingIn:boolean = false;

    /**
     * Runs the getAccesstoken method in the UserService.
     * Sets the accessToken recieved from the backend.
     * Sets login to true for routing permissions.
     * Redirects the user to the users page.
     */
    validateUser(){
        this.loggingIn = true;
        this.registerService.responseMessage = "";
        this.userService.getAccessToken()
        .subscribe(
            data => {
            this.authService.accessToken = data.access_token;
            this.authService.login();
            sessionStorage.setItem("token", this.authService.accessToken);
            this.router.navigate(['/users']);
            }, 
            err => {
                this.errorShow = true;
                this.loggingIn = false;
            });
    }

    errorShow:boolean = false;


}
