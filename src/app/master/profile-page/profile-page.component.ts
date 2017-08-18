import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login.service';
import { AuthService } from '../../auth.service';
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

  user:any;
  profileVisited:string;

  constructor(
    private loginService:LoginService, 
    private http:Http, 
    private router:Router, 
    private activatedRoute:ActivatedRoute,
    private authService:AuthService,
  ) {

    // Everytime the parameter changes it re-runs these methods.
    router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        this.getParam();
        this.profileSubscribe();
      }
      // NavigationStart
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });

  }

  ngOnInit() {
  }

  // Subscribes to the profile data.
  profileSubscribe(){
    this.getProfileData().subscribe(data => {
        this.user = data[0];
    });
  }

  // Gets the parameter in the url
  getParam(){
    this.activatedRoute.params.subscribe(
      params => {
        this.profileVisited = params.username;
      }
    );
  }

  // Gets the profile data from the backend.
  getProfileData(): Observable<User[]> {
    var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.accessToken,
    });

    return this.http.get("http://photoshare.dev:8000/api/user/username/" + this.profileVisited, {
        headers:headers
    }).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
