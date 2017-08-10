import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, Response } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable()
export class LoginService {

  constructor(private http:Http, private authService:AuthService) { }

  private oauthUrl = "http://photoshare.dev:8000/oauth/token";

  //Credentials binded in the login form.
  username:string;
  password:string;

  getAccessToken() {
        var headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });

        let postData = {
            grant_type: "password",
            client_id: 2,
            client_secret: this.authService.clientSecret,
            username: this.username,
            password: this.password,
            scope: ""
        }

        /**
         * Sending login credentials to the backend for validation
         * - this will return a token back.
         */
        return this.http.post(this.oauthUrl, JSON.stringify(postData), {
            headers: headers
        })
            .map( res => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
