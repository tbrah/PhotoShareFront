import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {

  constructor() {
    /**
     * TODO: Should change this to check if the sessionStorage
     * has a Item of "Token" instead of checking the length.
     */
    if(sessionStorage.length > 0){
      this.accessToken = sessionStorage.getItem("token");
      this.login();
    }
  }

  // Token provided by server after login credentials confirmed.
  accessToken:string;

  // Used for storing the url the user was trying to access before login.
  redirectUrl:string;

  // Used to give permission to the backend.
  clientSecret:string = "DoVLEPIw4SgrhS6S9pHMvqIthH2RcI5MptdrtsEr";

  isLoggedIn = false;

  login() {
    return this.isLoggedIn = true;
  }

  logout(){
    return this.isLoggedIn = false;
  }

}
