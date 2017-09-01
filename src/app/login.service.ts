import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, Response } from '@angular/http';
import { AuthService } from './auth.service';
import { User } from './user';

@Injectable()
export class LoginService {

  // User that is logged in.
  user: any;

  constructor(private http:Http, private authService:AuthService) { 

    /**
     *  Grab the user stored in sessionStorage.
     *  If User refreshes the page the data persists.
     *  Data is lost once user either logs out or closes tab.
     */
    if(sessionStorage.length > 0){
      this.user = JSON.parse(sessionStorage.getItem("user"));
    }

  }

  // Link used for authentication
  private oauthUrl = "http://photoshare.dev:8000/oauth/token";

  // Checks if its the first time user is logged in.
  firstLogin:boolean;

  subscribeLoggedUser(email){

      this.getLoggedUser(email).subscribe(data => 
        {   
            sessionStorage.setItem("user", JSON.stringify(data[0]));
            this.user = JSON.parse(sessionStorage.getItem("user"));
        },
        error =>console.log(error))
  }

  /**
   * Grabs the access token from the backend.
   */
  getAccessToken(username, password) {
        var headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });

        let postData = {
            grant_type: "password",
            client_id: 2,
            client_secret: this.authService.clientSecret,
            username: username,
            password: password,
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

    /**
     * Grabs the user information
     * for the user trying to login.
     */
    getLoggedUser(username): Observable<User[]>{
        var headers = new Headers({
            "Accept": "application/json",
            "Authorization": "Bearer " + this.authService.accessToken,
        });

        return this.http.get("http://photoshare.dev:8000/api/user/" + username, {
            headers: headers
        })
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
