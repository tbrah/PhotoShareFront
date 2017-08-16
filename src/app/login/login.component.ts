import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { LoginService } from '../login.service';
import { AuthService } from '../auth.service';
import { RegisterService } from '../register.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { FadeInAnimationFast, FadeInAnimation } from '../_animations';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [FadeInAnimationFast, FadeInAnimation],
})
export class LoginComponent implements OnInit {

  constructor(
    private authService:AuthService, 
    private userService:UserService,
    private loginService:LoginService, 
    private router:Router, 
    private activatedRoute:ActivatedRoute,
    private registerService:RegisterService) 
    { 
        this.activatedRoute.params.subscribe( params => this.emailValidated = params.state);
    }

  ngOnInit() {
  }

  loggingIn:boolean = false;
  errorShow:boolean = false;
  emailValidated;

    /**
     * Runs the getAccesstoken method in the LoginService.
     * Sets the accessToken recieved from the backend.
     * Sets login to true for routing permissions.
     * Redirects the user to the page they were trying
     * to access prior to them logging in.
     */
    validateUser(){
        this.loggingIn = true;
        this.registerService.responseMessage = "";
        this.loginService.getAccessToken()
        .subscribe(
            data => {
            this.authService.accessToken = data.access_token;
            this.authService.login();
            sessionStorage.setItem("token", this.authService.accessToken);
            this.loginService.getLoggedUser()
            .subscribe(
                data => {
                    this.loginService.user = data[0];
                    this.loginService.firstLogin = this.loginService.user.info.first_login;
                });
            
                // Check if redirectUrl string is empty or not.
                if(!this.authService.redirectUrl){
                    this.router.navigate(['']);
                } else {
                this.router.navigate([this.authService.redirectUrl]);
                }

            }, 
            err => {
                this.errorShow = true;
                this.loggingIn = false;
            });
    }

}
