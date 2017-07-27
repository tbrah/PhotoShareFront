import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';

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
  password_confirmation:string = "";

  constructor(private fb: FormBuilder, private http:Http, private router:Router) {
    /**
     * Validation requirements for the form.
     */
    this.rForm = fb.group({
      'username': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
      'email': [null, Validators.compose([Validators.required, Validators.email, Validators.maxLength(255)])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      'password_confirmation': [null, Validators.required],
    });

  }

  ngOnInit() {
  }

  public loading = false;
  public errorMessage:string;

  /**
   * @param post = data from the form 
   * -username
   * -email
   * -password
   * -password_confirmation
   */
  addUser(post){
    this.loading = true;
    if(post.password == post.password_confirmation){

      var headers = new Headers({
        "Content-Type": "application/json",
        "Accept": "application/json"
      });

      let newUser = 
      { username: post.username, 
        email: post.email,
        password: post.password,
        password_confirmation: post.password_confirmation
    };
      /**
       * Posting the register information to the server.
       */
      this.http.post("http://photoshare.dev:8000/api/users/create", JSON.stringify(newUser),{
        headers:headers
        }).subscribe(data => this.router.navigate(['/login']),
                      error => {
                        //backend make it return errors to display here.
                        console.log(error._body);
                        this.loading = false;
                      }
        );

        // Send the user back to the login page.
        

    } else {
      // Do some logic so it returns something in the dom.
      console.log("Passwords didn't match");
      this.loading = false;
    }

  }


}
