import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login.service';
import { AuthService } from '../../auth.service';
import { ProfileService } from '../../profile.service';
import { Observable } from 'rxjs/Rx';
import { User } from '../../user';
import { Http, Headers, Response } from '@angular/http';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  profileVisited:string;

  constructor(
    private loginService:LoginService, 
    private http:Http, 
    private router:Router, 
    private activatedRoute:ActivatedRoute,
    private authService:AuthService,
    private profileService:ProfileService,
  ) {

    // Everytime the parameter changes it re-runs these methods.
    router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        this.getParam();
        this.profileService.profileSubscribe();
      }
      // NavigationStart
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });

  }

  ngOnInit() {
  }

  // Gets the parameter in the url
  getParam(){
    this.activatedRoute.params.subscribe(
      params => {
        this.profileVisited = params.username;
        this.profileService.profileVisited = params.username;
      }
    );
  }

}
