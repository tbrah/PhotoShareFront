import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { LoginService } from './login.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Rx';
import { ProfileService } from './profile.service'; 


@Injectable()
export class LikeService {

  constructor(private http:Http,
  private loginService:LoginService,
  private profileService:ProfileService,
  private authService:AuthService) { }

  // Header information for the api requests.
  headers = new Headers({
    "Accept": "application/json",
    "Authorization": "Bearer " + this.authService.accessToken,
  });

  postLike(postId) {

    let data = {
      user_id : this.loginService.user.id
    }

    console.log(data);

    this.http.post("http://photoshare.dev:8000/api/post/" + postId + "/like", data,{
      headers:this.headers
      }).subscribe(data => this.profileService.profileSubscribe(),error => console.log(error));

  }

  check:boolean = true;


}
