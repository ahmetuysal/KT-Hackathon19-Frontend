import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { FileUploadService } from '../shared/services/file-upload.service';
import { EquityFundingService } from '../shared/services/equity-funding.service';
import { FormControl, Validators } from '@angular/forms';
import { EquityFundingPost } from '../shared/models/equity-funding-post.model';

@Component({
  selector: 'app-create-equity-funding',
  templateUrl: './create-equity-funding.component.html',
  styleUrls: ['./create-equity-funding.component.scss']
})
export class CreateEquityFundingComponent implements OnInit {
  image: Blob = null;
  showCropper: boolean = false;
  waiting: boolean = false;
  croppedImage: any;
  imageChangedEvent: any = '';

  title: FormControl;
  sharePrice: FormControl;
  targetShare: FormControl;
  deadline: FormControl;
  description: FormControl;

  cancelClicked() {
    this.image = null;
    this.showCropper = false;
  }

  async doneClicked() {
    this.showCropper = false;
  }

  fileChangeEvent(event: any): void {
    this.showCropper = true;
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.image = event.file;
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

  constructor(private fileUploadService: FileUploadService, private equityFundingService: EquityFundingService) {}

  ngOnInit() {
    this.title = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(256)]);
    this.sharePrice = new FormControl('', [Validators.required, Validators.min(0)]);
    this.targetShare = new FormControl('', [Validators.required, Validators.min(1)]);
    this.deadline = new FormControl(new Date());
    this.description = new FormControl('', [Validators.minLength(4), Validators.maxLength(256)]);
  }

  async submit() {
    this.waiting = true;

    const newEquityFundingPost = new EquityFundingPost();

    newEquityFundingPost.title = this.title.value;
    newEquityFundingPost.sharePrice = this.sharePrice.value;
    newEquityFundingPost.targetShare = this.targetShare.value;
    newEquityFundingPost.deadline = this.deadline.value;
    newEquityFundingPost.description = this.description.value;

    if (this.image) {
      const imageUrl = await this.fileUploadService.uploadImage(this.image);
      console.log(imageUrl);
      if (imageUrl) newEquityFundingPost.image = imageUrl;
    }

    const success = await this.equityFundingService.createEquityFundingPost(newEquityFundingPost);
    if (success) {
      // Show success
    } else {
      // Show error
    }

    this.waiting = false;
  }
}
