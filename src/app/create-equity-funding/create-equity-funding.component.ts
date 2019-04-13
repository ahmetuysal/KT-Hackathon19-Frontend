import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-create-equity-funding',
  templateUrl: './create-equity-funding.component.html',
  styleUrls: ['./create-equity-funding.component.scss']
})
export class CreateEquityFundingComponent implements OnInit {
  image: any = null;
  showCropper: boolean = false;
  croppedImage: any;
  imageChangedEvent: any = '';

  cancelClicked() {
    this.showCropper = false;
  }

  doneClicked() {
    this.image = this.croppedImage;
    this.croppedImage = '';
    this.showCropper = false;
  }

  fileChangeEvent(event: any): void {
    this.showCropper = true;
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
  }

  constructor() {}

  ngOnInit() {}
}
