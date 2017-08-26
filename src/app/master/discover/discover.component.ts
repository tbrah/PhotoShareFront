import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../profile.service';
import { DiscoverService } from '../../discover.service';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, Response } from '@angular/http';
import { AuthService } from '../../auth.service';
import { User } from '../../user';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {

  constructor(private profileService:ProfileService, 
    private authService:AuthService,
    private http:Http,
    private discoverService:DiscoverService,
    private router:Router) { 

      this.discoverService.discoverSubscribe();

    }

  ngOnInit() {
  }

}
