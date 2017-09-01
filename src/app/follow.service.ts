import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { LoginService } from './login.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Rx';
import { ProfileService } from './profile.service';

@Injectable()
export class FollowService {

  constructor(private http:Http, 
    private loginService:LoginService, 
    private authService:AuthService,
    private profileService:ProfileService,) { }

  // Header information for the api requests.
  headers = new Headers({
    "Accept": "application/json",
    "Authorization": "Bearer " + this.authService.accessToken,
  });

  followUser(userId) {

    let loggedUser = this.loginService.user.id;

    let data = {
      token : this.loginService.user.token
    }

    this.http.post("http://photoshare.dev:8000/api/user/" + loggedUser + "/follows/" + userId + "", data,{
      headers:this.headers
      }).subscribe(data => {
        this.loginService.subscribeLoggedUser(this.loginService.user.email);
      },error => console.log(error));

  }

}
