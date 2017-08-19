import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login.service';
import { PopupService } from '../../popup.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private loginService:LoginService, private router:Router, private popupService:PopupService) {}

  ngOnInit() {
  }

  test(){
      this.router.navigate(['/profile/JohnDoe']);
  }

  testTwo()
  {
      this.router.navigate(['/profile/ggg']);    
  }

  signout(){
    this.router.navigate(["/login"]);
    // Reset these values so if user logs out and in credientails are wiped.
    this.loginService.user = [];
    this.loginService.username = "";
    this.loginService.password = "";
    sessionStorage.removeItem("user");
  }

  activateUploadPopup(){
    this.popupService.uploadPopupState = true;
  }

}
