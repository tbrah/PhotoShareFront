import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';


@Injectable()
export class RegisterService {

  constructor(private http:Http, private router:Router) {}

    public loading = false;

    /**
     * Shows success message in the login page
     * if there is a string contained in the 
     * variable.
     */
    public responseMessage;

    public errorMessage = [];

    errorReset(){
      this.errorMessage = [];
    }
    
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
        }).subscribe(
          data => {
            this.router.navigate(['/login']);
            this.loading = false;
            this.responseMessage = data.json();
          },
          error => {
            let errorResponse = error.json();
            for (var key in errorResponse){
              if(errorResponse.hasOwnProperty(key)){
                this.errorMessage = [];
                this.errorMessage.push(errorResponse[key][0]);
              }
            }
            this.loading = false;
          });
        

    } else {
      // Do some logic so it returns something in the dom.
      this.errorMessage.push("Passwords didn't match.");
      this.loading = false;
    }

  }


}
