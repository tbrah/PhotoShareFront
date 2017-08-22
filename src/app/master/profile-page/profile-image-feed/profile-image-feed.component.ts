import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LoginService } from '../../../login.service';
import { AuthService } from '../../../auth.service';
import { ProfileService } from '../../../profile.service';
import { CommentService } from '../../../comment.service';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
  selector: 'profile-image-feed',
  templateUrl: './profile-image-feed.component.html',
  styleUrls: ['./profile-image-feed.component.scss']
})
export class ProfileImageFeedComponent implements OnInit {
  
  commentForm:FormGroup;

  constructor(private loginService:LoginService, 
  private authService:AuthService, 
  private http:Http, 
  private router:Router,
  private fb:FormBuilder,
  private profileService:ProfileService,
  private commentService:CommentService,)
  {
    this.commentForm = fb.group({
      'comment': [null, Validators.compose([Validators.required, Validators.minLength(1)])],
    });
  }

  ngOnInit() {
  }

  showCommentsSwitch:number;
  showCommentsArray = [];

  /**
   * Allows user to show and hide comments on
   * different posts at the same time.
   * @param i Index of the post
   */
  showComments(i){
    let index = this.showCommentsArray.length;

    if(this.showCommentsArray.includes(i)){
      let removeIndex = this.showCommentsArray.indexOf(i);
      this.showCommentsArray.splice(removeIndex, 1);
    } else {
      this.showCommentsArray.push(i);
    }
  }


  sendComment(formValue, post){
    let data = {
      post_id: post.id,
      user_id: this.loginService.user.id, 
      comment: formValue.comment
    }

    this.commentService.postCommentData(data);
    this.commentForm.reset();
  }


}
