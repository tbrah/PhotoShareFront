import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LoginService } from '../../../login.service';
import { AuthService } from '../../../auth.service';
import { ProfileService } from '../../../profile.service';
import { CommentService } from '../../../comment.service';
import { LikeService } from '../../../like.service';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StopPropagationDirective } from '../../../stop-propagation.directive';
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
  private commentService:CommentService,
  private likeService:LikeService)
  {
    this.commentForm = fb.group({
      'comment': [null, Validators.compose([Validators.required, Validators.minLength(1)])],
    });
  }

  ngOnInit() {
  }

  showCommentsSwitch:number;
  showCommentsArray = [];
  showPopOver:number;

  /**
   * Allows user to show and hide comments on
   * different posts at the same time.
   * @param {number} i 
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

  /**
   * Used to detect if the user should be able to delete
   * a comment or not.
   * Comments should be deletable if user owns comment or post.
   * @param {number} commentId 
   * @param {object} post 
   */
  deletableComment(commentId, postId){
    let loggedUser = this.loginService.user.id;
    if(commentId == loggedUser || postId == loggedUser){
      return true;
    } else {
      return false;
    }
  }

  /**
   * Resets the popover & dimmed background.
   */
  resetShowPopover(){
    this.showPopOver = null;
  }

  /**
   * Toggles the showpopover for given comment.
   * @param {number} commentId 
   */
  areYouSure(commentId){
    this.showPopOver = commentId;
  }

  /**
   * Activates the deleteComment in commentService.
   * @param {number} commentId 
   * @param {number} postId 
   */
  deleteComment(commentId, postId, deleteBool){
    if(deleteBool == true){
      this.commentService.deleteComment(commentId, postId);
      this.resetShowPopover();
    } else {
      this.resetShowPopover();
    }
  }

/**
 * Sends comment request to backend.
 * @param {object} formValue 
 * @param {object} post 
 */
  sendComment(formValue, post){
    let data = {
      post_id: post.id,
      user_id: this.loginService.user.id, 
      comment: formValue.comment
    }

    this.commentService.postCommentData(data);
    this.commentForm.reset();
  }

  /**
   * Run the postLike method in the likeService.
   * postLike makes a post request.
   * Handles liking and unliking posts.
   * @param {number} postId 
   */
  likePost(postId){
    this.likeService.postLike(postId);
  }

  /**
   * Check if the logged user has already liked the post.
   * @param {object} post 
   */
  checkLike(post){
    let check:boolean;

    // If the likes array is empty : skip.
    if(post.likes.length <= 0){

      check = false;   
      return check;

    // If the likes array is not empty.
    } else if(post.likes.length > 0)  {

      /**
       * Loop through each array and see
       * if the like.user_id is in the array.
       */
      for (var index = 0; index < post.likes.length; index++) {
        var like = post.likes[index];

        // If the user is found break the loop.
        if(like.user_id == this.loginService.user.id){
          check = true;
          break
        } else {
          check = false;
        }
      }
        return check;
    }
  }

  // +++++++++++++++++++ IMAGE FOCUS +++++++++++++++++++ //

  showFocusImage:boolean = false;
  focusPost:any = [];
  profileServicePosts:any = [];
  nextPost:any = [];

  imageFocus(post){
    if(this.showFocusImage == false){
      this.focusPost = post;
      this.profileServicePosts = this.profileService.posts;
      this.showFocusImage = true;
    } else {
      this.showFocusImage = false;
    }
  }

  /**
   * Finds the next image to be shown using 
   * the navigation arrows.
   * @param {object} post 
   * @param {string} direction "left" "right"
   */
  nextImage(post, direction){
    let postArray = this.profileServicePosts;
    let arrayLength = postArray.length;
    // If user reaches end of the array, show current picture.
    this.nextPost = this.focusPost;

    // Looops through the posts and makes sure to stop at each end of the array.
    for (var index = 0; index < this.profileService.posts.length; index++) {
      var focusElement = postArray[index];
      if(focusElement.id == post.id){
        if(direction == "left" && index !== 0){
          this.nextPost = postArray[index - 1];
          break
        } else if(direction == "right" && arrayLength-1 !== index){
          this.nextPost = postArray[index + 1];
          break
        }
      }
    }
    this.focusPost = this.nextPost;
  }

}
