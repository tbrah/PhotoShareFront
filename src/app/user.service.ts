import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, Response } from '@angular/http';
import { User } from './user';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {

  constructor(private http: Http, private authService:AuthService) { }

	private usersUrl = "http://photoshare.dev:8000/api/users";

    /**
     * Used to populate users when the UsersComponent 
     * is constructed.
     * Access Token must be valid and fetched.
     */
    getUsers(): Observable<User[]> {

        var headers = new Headers({
            "Accept": "application/json",
            "Authorization": "Bearer " + this.authService.accessToken,
        });

        return this.http.get(this.usersUrl, {
            headers: headers
        })
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}

