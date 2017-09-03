import { Component, OnInit } from '@angular/core';
import { FollowService } from '../../follow.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {

  constructor(private followService: FollowService, private router:Router) { }

  ngOnInit() {
    this.followService.getFollowerList();
    }

}
