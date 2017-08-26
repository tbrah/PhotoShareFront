import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { LoginService } from './login.service';
import { DiscoverService } from './discover.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Rx';
import { ProfileService } from './profile.service';


@Injectable()
export class LikeService {

  constructor(private http:Http,
  private loginService:LoginService,
  private profileService:ProfileService,
  private authService:AuthService,
  private discoverService:DiscoverService) { }

  // Header information for the api requests.
  headers = new Headers({
    "Accept": "application/json",
    "Authorization": "Bearer " + this.authService.accessToken,
  });

    /**
   * Likes or unlikes the post clicked on.
   * The backend detects whether or not user
   * has already liked post or not.
   * @param {number} postId 
   */

  /**
   * Likes or unlikes the post clicked on.
   * Updates the post arrays on the component
   * which the post was liked from.
   * @param {number} postId 
   * @param {string} component 
   */
  postLike(postId, component) {

    let data = {
      user_id : this.loginService.user.id
    }

    this.http.post("http://photoshare.dev:8000/api/post/" + postId + "/like", data,{
      headers:this.headers
      }).subscribe(data => {
        if(component == "profile"){
          this.profileService.profileSubscribe();
        } else if(component == "discover") {
          this.discoverService.discoverSubscribe();
        }
      },error => console.log(error));

  }

}
