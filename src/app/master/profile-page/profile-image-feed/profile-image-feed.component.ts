import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../login.service';

@Component({
  selector: 'profile-image-feed',
  templateUrl: './profile-image-feed.component.html',
  styleUrls: ['./profile-image-feed.component.scss']
})
export class ProfileImageFeedComponent implements OnInit {

  constructor(private loginService:LoginService) { }

  ngOnInit() {
  }

}
