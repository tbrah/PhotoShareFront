import { Component, OnInit } from '@angular/core';
import { PopupService } from '../../popup.service';
import { LoginService } from '../../login.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FadeInAnimation, FadeInAnimationFast } from '../../_animations';


@Component({
  selector: 'add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {

  constructor(private popupService:PopupService, private loginService:LoginService, public sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  file:any;
  imageViewerUrl:any;

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
  }
}
