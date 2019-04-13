import { Injectable } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { LoginDialogComponent } from 'src/app/login-dialog/login-dialog.component';
import { SignupDialogComponent } from 'src/app/signup-dialog/signup-dialog.component';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

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
}
