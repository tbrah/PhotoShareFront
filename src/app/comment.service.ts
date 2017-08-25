import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { ProfileService } from './profile.service'; 
import { LoginService } from './login.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CommentService {

  constructor(private http:Http,
    private authService:AuthService,
    private loginService:LoginService,
    private profileService:ProfileService) { }

    comments:any;

    // Header information for the api requests.
    headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.accessToken,
    });

  /**
   * Posting the comment to the backend.
   * @param {object} commentData 
   */
  postCommentData(commentData) {

    this.http.post("http://photoshare.dev:8000/api/post/" + commentData.post_id + "/postComment", commentData,{
      headers:this.headers
      }).subscribe(data => this.profileService.profileSubscribe(),error => console.log(error));

  }

  /**
   * Grab the comments for the givin post.
   * @param {number} postId 
   */
  getCommentData(postId){

    return this.http.get("http://photoshare.dev:8000/api/post/" + postId + "/getComments", {
        headers:this.headers
    }).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteComment(commentId, postId){
    let data = {
      user_id: this.loginService.user.id
    }
    this.http.post("http://photoshare.dev:8000/api/post/" + postId + "/deleteComment/" + commentId + "", data,{
    headers:this.headers
    }).subscribe(data => this.profileService.profileSubscribe(),error => console.log(error));
  }
}
