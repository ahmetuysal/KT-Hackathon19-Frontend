import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { ImageCropperModule } from 'ngx-image-cropper';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { SignupDialogComponent } from './signup-dialog/signup-dialog.component';
import { AuthService } from './shared/services/auth.service';
import { CreateFundraisingComponent } from './create-fundraising/create-fundraising.component';
import { CreateEquityFundingComponent } from './create-equity-funding/create-equity-funding.component';
import { PaymentDialogComponent } from './payment-dialog/payment-dialog.component';

export function init_auth(authService: AuthService) {
  return () => authService.populate();
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    LoginDialogComponent,
    SignupDialogComponent,
    CreateFundraisingComponent,
    CreateEquityFundingComponent,
    PaymentDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatMenuModule,
    ReactiveFormsModule,
    HttpClientModule,
    ImageCropperModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ],
  entryComponents: [LoginDialogComponent, SignupDialogComponent, PaymentDialogComponent],
  providers: [
    AuthService,
    { provide: APP_INITIALIZER, useFactory: init_auth, deps: [AuthService], multi: true },
    { provide: LOCALE_ID, useValue: 'tr' }
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
