import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../profile.service';
@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {

  constructor(private profileService:ProfileService) { }

  ngOnInit() {
  }

}
