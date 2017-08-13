import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';

@Component({
  selector: 'first-login-popup',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.scss']
})
export class FirstLoginComponent implements OnInit {

  detailsForm:FormGroup;
  first_name:string = "";
  last_name:string = "";
  country:string = "";
  avatar:File;

  constructor(private fb: FormBuilder, private http:Http) { 

    this.detailsForm = fb.group({
      'first_name': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
      'last_name': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'country': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      'avatar':[null, Validators.compose([Validators.required])]
    });

  }

  ngOnInit() {
  }

  saveDetails(post){
    console.log(post);
  }

}
