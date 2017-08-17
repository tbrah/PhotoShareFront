import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login.service';

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  constructor(private loginService:LoginService) { }

  ngOnInit() {
  }

}
