import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { CanActivate, ActivatedRoute, Router } from '@angular/router';
import { FadeInAnimationFast } from '../_animations';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [FadeInAnimationFast],
    host: { '[@FadeInAnimationFast]':''}
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private http:Http, private router:Router) { }

  email:string;
  loading:boolean;
  errorShow;

  sendRequest(){
    this.loading = true;

    var headers = new Headers({
      "Content-Type": "application/json",
      "Accept": "application/json"
    });

    let postData = {
      email : this.email
    }

    this.http.post('http://photoshare.dev:8000/api/forgot-password', JSON.stringify(postData),{
      headers:headers
    }).subscribe(data => {
      this.loading = false;
      this.router.navigate(['/login/resetSent']);
    }, err => {
      this.loading = false;
      this.errorShow = JSON.parse(err.text());
    })

  }

  ngOnInit() {
  }

}
