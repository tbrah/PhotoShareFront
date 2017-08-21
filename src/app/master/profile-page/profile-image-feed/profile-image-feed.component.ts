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
    }

  private _posts:any;
    @Input() set posts(value:any){
      this._posts = value;
    }

  constructor(private loginService:LoginService, private authService:AuthService, private http:Http, private router:Router) { }

  ngOnInit() {
  }

}
