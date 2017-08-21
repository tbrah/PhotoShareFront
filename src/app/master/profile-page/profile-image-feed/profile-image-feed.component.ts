import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../../../login.service';
import { AuthService } from '../../../auth.service';
import { ProfileService } from '../../../profile.service';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, Response } from '@angular/http';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
  selector: 'profile-image-feed',
  templateUrl: './profile-image-feed.component.html',
  styleUrls: ['./profile-image-feed.component.scss']
})
export class ProfileImageFeedComponent implements OnInit {

  constructor(private loginService:LoginService, 
  private authService:AuthService, 
  private http:Http, 
  private router:Router,
  private profileService:ProfileService) { }

  ngOnInit() {
  }

}
