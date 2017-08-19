import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../../../login.service';
import { AuthService } from '../../../auth.service';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, Response } from '@angular/http';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
  selector: 'profile-image-feed',
  templateUrl: './profile-image-feed.component.html',
  styleUrls: ['./profile-image-feed.component.scss']
})
export class ProfileImageFeedComponent implements OnInit {

  private _user:any;
    @Input() set user(value:any){
      this._user = value;
    }

  private _profileVisited:string;
    @Input() set profileVisited(value:string){
      this._profileVisited = value;
      this.imageFeedSubscribe();
    }

  posts:any;

  constructor(private loginService:LoginService, private authService:AuthService, private http:Http, private router:Router) { }

  ngOnInit() {
  }

   // Subscribes to the profiles image feed.
  imageFeedSubscribe(){
    this.getImageFeed().subscribe(data =>
    {
      this.posts = data.posts[0].posts;
    }),
    error => console.log(error) 
  }

  getImageFeed(){
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.accessToken,
    });

    return this.http.get("http://photoshare.dev:8000/api/posts/" + this._profileVisited, {
        headers:headers
    }).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
