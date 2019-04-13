import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SignupRequest } from '../shared/models/signup-request.model';
import { CheckUsernameRequest } from '../shared/models/check-username-request.model.ts';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.scss']
})
export class SignupDialogComponent implements OnInit, OnDestroy {
  name: FormControl;
  surname: FormControl;
  userName: FormControl;
  email: FormControl;
  password: FormControl;
  waiting: boolean = false;
  userNameTaken: boolean = false;
  userNameAvailable: boolean = false;
  errorMessage: String;

  private usernameSubscription: Subscription;

  constructor(private authService: AuthService, public dialogRef: MatDialogRef<SignupDialogComponent>) {}

  ngOnInit() {
    this.name = new FormControl('', [
      Validators.required,
      Validators.maxLength(32),
      Validators.pattern('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ ]+$')
    ]);
    this.surname = new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
      Validators.pattern('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ ]+$')
    ]);
    this.userName = new FormControl('', [Validators.required, Validators.minLength(4)]);
    this.usernameSubscription = this.userName.valueChanges.pipe(debounceTime(250)).subscribe(() => {
      // console.log(`Check is called:  ${new Date().toLocaleTimeString()}`);
      this.checkUserNameAvailability().then(isAvailable => {
        this.userNameTaken = !isAvailable;
        this.userNameAvailable = isAvailable;
      });
    });
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  }

  ngOnDestroy(): void {
    // TODO: is this needed?
    this.usernameSubscription.unsubscribe();
  }

  async onSubmit() {
    this.waiting = true;

    const name: string = this.name.value.trim();
    const indexSpace: number = name.indexOf(' ');

    const firstName: string = indexSpace != -1 ? name.substring(0, indexSpace) : name;

    const signupRequest = new SignupRequest(
      this.userName.value,
      this.email.value,
      this.password.value,
      firstName,
      this.surname.value
    );

    // Don't have to check indexSpace == name.length - 1 due to trim
    if (indexSpace != -1) signupRequest.middleName = name.substring(indexSpace + 1);

    const success = await this.authService.attemptSignup(signupRequest);

    if (success) {
      this.dialogRef.close(true);
    } else {
      this.errorMessage = 'Something went wrong, please try later.';
    }

    this.waiting = false;
  }

  getErrorMessageName(): string {
    if (this.name.hasError('required')) return 'You must enter your name';
    if (this.name.hasError('pattern')) return 'You name can only have alphabetical characters';
    if (this.name.hasError('maxlength')) return 'Your username can have at most 32 characters';
    return '';
  }

  getErrorMessageSurname(): string {
    if (this.surname.hasError('required')) return 'You must enter your surname ';
    if (this.surname.hasError('pattern')) return 'You surname can only have alphabetical characters';
    if (this.surname.hasError('maxlength')) return 'Your username can have at most 20 characters';
    return '';
  }

  getErrorMessageUserName(): string {
    if (this.userName.hasError('required')) return 'You must enter a username';
    if (this.userName.hasError('minlength')) return 'Your username must have at least 4 characters';
    return '';
  }

  getErrorMessageEmail(): string {
    if (this.email.hasError('required')) return 'You must enter an email';
    if (this.email.hasError('email')) return 'Please enter a valid email address';
    return '';
  }

  getErrorMessagePassword(): string {
    if (this.password.hasError('required')) return 'You must enter a password';
    if (this.password.hasError('minlength')) return 'Your password should have at least 8 characters';
    return '';
  }

  checkUserNameAvailability() {
    return this.authService.checkUserNameAvailability(new CheckUsernameRequest(this.userName.value));
  }
}
