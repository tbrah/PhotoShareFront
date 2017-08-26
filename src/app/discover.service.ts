import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, Response } from '@angular/http';
import { User } from './user';

@Injectable()
export class DiscoverService {

  posts:any;

  constructor(private http:Http, private authService:AuthService) { }

  discoverSubscribe(){
    this.getDiscoverData().subscribe(data => {
      this.posts = data[0];
    })
  }

  // Gets the profile data from the backend.
  getDiscoverData(): Observable<User[]> {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.accessToken,
    });

    return this.http.get("http://photoshare.dev:8000/api/posts/", {
        headers:headers
    }).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
