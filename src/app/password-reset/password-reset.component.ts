import { Component, OnInit } from '@angular/core';
import { CanActivate, ActivatedRoute, Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FadeInAnimation, FadeInAnimationFast } from '../_animations';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
  animations: [FadeInAnimation, FadeInAnimationFast],
})
export class PasswordResetComponent implements OnInit {
  
  passwordForm:FormGroup;
  password:string = "";
  password_confirmation:string = "";

  constructor(private activatedRoute:ActivatedRoute, private http:Http, private fb:FormBuilder, private router:Router) { 
    this.activatedRoute.params.subscribe( params => {
      this.id = params.id;
      this.resetToken = params.token;
      this.passwordForm = fb.group({
        'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
        'password_confirmation': [null, Validators.required],
      });
    });
  }

  id:string;
  resetToken:string;

  errorMessage:string;
  loading:boolean = false;

  ngOnInit() {
  }

  checkUser(post){
        this.loading = true;

        var headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });

        let postData = {
          id : this.id,
          resetToken : this.resetToken,
          password : post.password,
          password_confirmation : post.password_confirmation
        }

        if(post.password == post.password_confirmation){
          this.http.post('http://photoshare.dev:8000/api/forgot-password-check', JSON.stringify(postData), {
              headers: headers
          }).subscribe(data => {
            console.log(data);
            this.router.navigate(['/login']);
            this.loading = false;
          }, err => console.log(err));

        } else {
          this.loading = false;
          this.errorMessage = "Passwords did not match."
        }

  }

}
