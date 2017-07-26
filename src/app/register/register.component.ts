import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  rForm:FormGroup;
  username:string = "";
  email:string = "";
  password:string = "";
  cpassword:string = "";

  constructor(private fb: FormBuilder) {
    
    this.rForm = fb.group({
      'username': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      'cpassword': [null, Validators.required],
    });

  }

  ngOnInit() {
  }

  addUser(post){
    if(post.password == post.cpassword){
      console.log("Passwords matched!");
      this.username = post.username;
      this.email = post.email;
      this.password = post.password;
    } else {
      console.log("Passwords didn't match");
    }

  }


}
