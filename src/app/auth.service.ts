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

  isLoggedIn = false;

  redirectUrl:string;

  login() {
    return this.isLoggedIn = true;
  }

  logout(){
    return this.isLoggedIn = false;
  }

}
