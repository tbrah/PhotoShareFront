import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {

  constructor() { }

  isLoggedIn = false;

  redirectUrl:string;

  login() {
    return this.isLoggedIn = true;
  }

  logout(){
    return this.isLoggedIn = false;
  }

}
