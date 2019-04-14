import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { FileUploadService } from '../shared/services/file-upload.service';
import { FundraisingService } from '../shared/services/fundraising.service';
import { FormControl, Validators } from '@angular/forms';
import { FundraisingPost } from '../shared/models/fundraising-post.model';

@Component({
  selector: 'app-create-fundraising',
  templateUrl: './create-fundraising.component.html',
  styleUrls: ['./create-fundraising.component.scss']
})
export class CreateFundraisingComponent implements OnInit {
  image: Blob = null;
  showCropper: boolean = false;
  waiting: boolean = false;
  croppedImage: any;
  imageChangedEvent: any = '';

  title: FormControl;
  targetAmount: FormControl;
  targetIban: FormControl;
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

  constructor(private fileUploadService: FileUploadService, private FundraisingService: FundraisingService) {}

  ngOnInit() {
    this.title = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(256)]);
    this.targetAmount = new FormControl('', [Validators.required, Validators.min(0)]);
    this.targetIban = new FormControl('', [Validators.required, Validators.minLength(26), Validators.maxLength(26)]);
    this.deadline = new FormControl(new Date());
    this.description = new FormControl('', [Validators.minLength(4), Validators.maxLength(256)]);
  }

  async submit() {
    this.waiting = true;

    const newFundraisingPost = new FundraisingPost();

    newFundraisingPost.title = this.title.value;
    newFundraisingPost.targetAmount = this.targetAmount.value;
    newFundraisingPost.targetIban = this.targetIban.value;
    newFundraisingPost.deadline = this.deadline.value;
    newFundraisingPost.description = this.description.value;

    if (this.image) {
      const imageUrl = await this.fileUploadService.uploadImage(this.image);
      console.log(imageUrl);
      if (imageUrl) newFundraisingPost.image = imageUrl;
    }

    const success = await this.FundraisingService.createFundraisingPost(newFundraisingPost);
    if (success) {
      // Show success
    } else {
      // Show error
    }

    this.waiting = false;
  }
}
