import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { FadeInAnimation, FadeInAnimationFast } from '../_animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [FadeInAnimation, FadeInAnimationFast],
  host: { '[@FadeInAnimation]':''}
})
export class RegisterComponent implements OnInit {

  rForm:FormGroup;
  username:string = "";
  email:string = "";
  password:string = "";
  password_confirmation:string = "";

  constructor(private fb: FormBuilder, private http:Http, private router:Router, private registerService:RegisterService) {
    /**
     * Validation requirements for the form.
     */
    this.rForm = fb.group({
      'username': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
      'email': [null, Validators.compose([Validators.required, Validators.email, Validators.maxLength(255)])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      'password_confirmation': [null, Validators.required],
    });

    this.registerService.errorReset();

  }

  ngOnInit() {
  }

}
