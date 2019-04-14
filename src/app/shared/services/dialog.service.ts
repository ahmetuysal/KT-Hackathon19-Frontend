import { Injectable } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { LoginDialogComponent } from 'src/app/login-dialog/login-dialog.component';
import { SignupDialogComponent } from 'src/app/signup-dialog/signup-dialog.component';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EquityFundingPost } from '../models/equity-funding-post.model';
import { FundraisingPost } from '../models/fundraising-post.model';
import { PaymentDialogComponent } from 'src/app/payment-dialog/payment-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private router: Router) {}

  showSignIn(redirectUrl?: string): void {
    const signInRef = this.dialog.open(LoginDialogComponent, {
      width: '320px',
      maxWidth: '100%'
    });

    if (redirectUrl != null) {
      signInRef
        .afterClosed()
        .pipe(take(1))
        .subscribe(result => {
          // result will be true if user logged in successfully
          if (result === true) {
            this.router.navigate([redirectUrl]);
          }
        });
    }
  }

  showSignUp(redirectUrl?: string): void {
    const signUpRef = this.dialog.open(SignupDialogComponent, {
      width: '440px',
      maxWidth: '100%'
    });
    signUpRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(result => {
        // result will be true if user logged in successfully
        if (result) {
          this.snackBar.open('Your account is created.', 'OK', {
            duration: 5000,
            horizontalPosition: 'center'
          });
        }
      });

    // TODO: How to handle redirect here? Account will not be verified yet
  }

  showPayment(post: EquityFundingPost | FundraisingPost): void {
    const paymentRef = this.dialog.open(PaymentDialogComponent, {
      width: '440px',
      maxWidth: '100%',
      data: post
    });

    paymentRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(result => {
        // result will be true if user paid successfully
        if (result) {
          this.snackBar.open('Success.', 'OK', {
            duration: 5000,
            horizontalPosition: 'center'
          });
        }
      });
  }

  showError(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 5000,
      horizontalPosition: 'center'
    });
  }
}
