import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, Response } from '@angular/http';
import { AuthService } from './auth.service';



@Injectable()
export class ProfileService {

  constructor(private http:Http, private authService:AuthService) {}

  profileVisited:string;
  user:any;
  posts:any;

  // Subscribes to the profile data.
  profileSubscribe(){
    this.getProfileData().subscribe(data => {
        this.user = data[0][0];
        this.posts = data[0][0].posts;
    });
  }

  // Gets the profile data from the backend.
  getProfileData(): Observable<User[]> {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.accessToken,
    });

    return this.http.get("http://photoshare.dev:8000/api/posts/" + this.profileVisited, {
        headers:headers
    }).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
