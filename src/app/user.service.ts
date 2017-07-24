import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, Response } from '@angular/http';
import { User } from './user';

@Injectable()
export class UserService {

  constructor(private http: Http) { }


	private oauthUrl = "http://photoshare.dev:8000/oauth/token";
	private usersUrl = "http://photoshare.dev:8000/api/users";

    //Credentials binded in the login form.
    username:string;
    password:string;

    // Token provided by server after login credentials confirmed.
    accessToken:string;

    /**
     * Gets activated as constructor in the 
     * - UserComponent.
     */
    getAccessToken() {
        var headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });

        let postData = {
            grant_type: "password",
            client_id: 2,
            client_secret: "amKXFmNubIbFVlR2JugKHkb5RwFgTQaKD70qjlmj",
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
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    /**
     * Used to populate users when the UsersComponent 
     * is constructed.
     * Access Token must be valid and fetched.
     */
    getUsers(): Observable<User[]> {

        var headers = new Headers({
            "Accept": "application/json",
            "Authorization": "Bearer " + this.accessToken,
        });

        return this.http.get(this.usersUrl, {
            headers: headers
        })
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}

