import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../../auth.service';
import { LoginService } from '../../login.service';

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


  file:File; // The image being uploaded.
  inputData:any;

  loadingImage:boolean = false; // Triggers loading icon while image loads.
  imageViewerUrl:string = "./assets/img/no_avatar.png"; // the image will be stored here temporarily.

  constructor(private fb: FormBuilder, private http:Http, private authService:AuthService, private loginService:LoginService) { 

    this.detailsForm = fb.group({
      'first_name': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
      'last_name': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'country': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
    });

  }

  ngOnInit() {
  }

    fileChange(event) {

        this.loadingImage = true;
        let fileList: FileList = event.target.files;
        if(fileList.length > 0) {
            this.file = fileList[0];

            let formData:FormData = new FormData();
            formData.append('uploadFile', this.file, this.file.name);

            let headers = new Headers();
            headers.append("Authorization", "Bearer " + this.authService.accessToken);

            let options = new RequestOptions({ headers: headers });

            this.http.post("http://photoshare.dev:8000/api/tempStoreImg", formData, options)
                .map(res => res.json())
                .catch(error => Observable.throw(error))
                .subscribe(
                    data => {
                        this.imageViewerUrl = data.url;
                        this.loadingImage = false;
                    },
                    error => {
                        console.log(error);
                        this.loadingImage = false;
                    }
                )
        }
    }

  saveDetails(post){
    this.inputData = post;

    let info = 
      { first_name: post.first_name, 
        last_name: post.last_name,
        country: post.country,
        user_id: this.loginService.user.id,
        //about: post.about
    };

    console.log(info);

    let formData:FormData = new FormData();
    formData.append('uploadFile', this.file, this.file.name);
    formData.append('info', JSON.stringify(info));

    var headers = new Headers({
        "Accept": "application/json",
        "Authorization": "Bearer " + this.authService.accessToken,
    });

    let options = new RequestOptions({ headers: headers });
    this.http.post("http://photoshare.dev:8000/api/userInfo", formData, options)
        .map(res => res.json())
        .catch(error => Observable.throw(error))
        .subscribe(
            data => this.loginService.getLoggedUser()
            // Reload the new data the user has sent.
                .subscribe(data => {
                    this.loginService.user = data[0];
                    this.loginService.user = JSON.parse(sessionStorage.getItem("user"));
                }),
            error => console.log(error)
        )
    

  }



}
