import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { LoginService } from './login.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CommentService {

  constructor(private http:Http,
    private authService:AuthService,
    private loginService:LoginService) { }

    comments:any;

    // Header information for the api requests.
    headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.accessToken,
    });

  getCommentSubscribe(postId){
    this.getCommentData(postId).subscribe(data => {
      this.comments = data.comments;
      console.log(this.comments);
    });
  }

  /**
   * Posting the comment information to the server.
   */
  postCommentData(commentData) {

    console.log(JSON.stringify(commentData));
    this.http.post("http://photoshare.dev:8000/api/post/" + commentData.post_id + "/postComment", commentData,{
      headers:this.headers
      }).subscribe(data => console.log(data),error => console.log(error));

  }

  /**
   * Grab the comments for the givin post.
   * @param postId 
   */
  getCommentData(postId){

    return this.http.get("http://photoshare.dev:8000/api/post/" + postId + "/getComments", {
        headers:this.headers
    }).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
