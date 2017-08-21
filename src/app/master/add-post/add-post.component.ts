import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { PopupService } from '../../popup.service';
import { LoginService } from '../../login.service';
import { ProfileService } from '../../profile.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../auth.service';
import { Observable } from 'rxjs/Rx';
import { FadeInAnimation, FadeInAnimationFast } from '../../_animations';


@Component({
  selector: 'add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {

  constructor(private popupService:PopupService, 
  private loginService:LoginService, 
  public sanitizer: DomSanitizer, 
  private http:Http, 
  private authService:AuthService,
  private profileService:ProfileService) { }

  ngOnInit() {
  }

  file:any;
  imageViewerUrl:any;
  description:string;
  loading:boolean = false;

  fileChange(event){
      let fileList: FileList = event.target.files;
      if(fileList.length > 0) {

          this.file = fileList[0];
          this.imageViewerUrl = window.URL.createObjectURL(this.file);
      }
  }

  resetChanges(){
    this.file = [];
    this.imageViewerUrl = "";
    this.description = "";
  }

  sendPost(){

  this.loading = true;

  let info = 
    { user_id: this.loginService.user.id,
      description: this.description
  };

  let formData:FormData = new FormData();
  formData.append('uploadFile', this.file, this.file.name);
  formData.append('info', JSON.stringify(info));

  var headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + this.authService.accessToken,
  });

  let options = new RequestOptions({ headers: headers });
  this.http.post("http://photoshare.dev:8000/api/post", formData, options)
      .map(res => res.json())
      .catch(error => Observable.throw(error))
      .subscribe(data => {
                  this.loading = false;
                  this.popupService.uploadPopupState = false;
                  this.profileService.profileSubscribe();
                  this.resetChanges();
                },error => console.log(error)
      )
  }
}
