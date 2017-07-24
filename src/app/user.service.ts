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
            username: this.username,//Johnny@gmail.com
            password: this.password,//test
            scope: ""
        }

        /**
         * Sending login credentials to the backend for validation
         * - this will return a token back.
         * - This gets initiated in the construction of the UserCompontent.
         */
        return this.http.post(this.oauthUrl, JSON.stringify(postData), {
            headers: headers
        })
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    /**
     * With the auth token from the backend passed, now able to retrieve data.
     * @param accessToken is passed from UserComponent getUsers method.
     */
    getUsers(accessToken: string): Observable<User[]> {

        var headers = new Headers({
            "Accept": "application/json",
            "Authorization": "Bearer " + accessToken,
        });

        return this.http.get(this.usersUrl, {
            headers: headers
        })
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}

