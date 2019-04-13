import { Component, OnInit } from '@angular/core';
import { LoginRequest } from '../shared/models/login-request.model';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  userName: FormControl;
  password: FormControl;
  waiting: boolean = false;
  errorMessage: String;

  constructor(private authService: AuthService, public dialogRef: MatDialogRef<LoginDialogComponent>) {}

  async onSubmit() {
    let loginRequest = new LoginRequest(this.userName.value, this.password.value);
    this.waiting = true;
    const success = await this.authService.attemptAuth(loginRequest);

    if (success) {
      this.dialogRef.close(true);
    } else {
      this.errorMessage = 'Incorrect username or password.';
    }

    this.waiting = false;
  }
  ngOnInit() {
    this.userName = new FormControl('', [Validators.required, Validators.minLength(4)]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  }

  getErrorMessageUserName(): string {
    if (this.userName.hasError('required')) return 'You must enter an username';
    if (this.userName.hasError('minlength')) return 'Your username must have at least 4 characters';
    return '';
  }

  getErrorMessagePassword(): string {
    if (this.password.hasError('required')) return 'You must enter a password';
    if (this.password.hasError('minlength')) return 'Your password should have at least 8 characters';
    return '';
  }
}
