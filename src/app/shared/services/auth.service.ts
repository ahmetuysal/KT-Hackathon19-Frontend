import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { User } from '../models/user.model';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { SignupRequest } from '../models/signup-request.model';
import { LoginRequest } from '../models/login-request.model';
import { CheckUsernameRequest } from '../models/check-username-request.model.ts';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public currentUser$: Observable<User> = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());
  private isAuthenticatedSubject: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  public isAuthenticated: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  redirectUrl: string;

  constructor(private http: HttpClient, private apiService: ApiService, private jwtService: JwtService) {}

  signOut(): void {
    this.purgeAuth();
  }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  async populate() {
    // If JWT detected, attempt to get & store user's info
    const _token: string = this.jwtService.getToken();
    console.log(`Token: ${_token}`);
    if (_token) {
      await this.updateCurrentUserUsingToken(_token);
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  async setAuth(token: string): Promise<void> {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(token);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
    // update the current user data using jwt token.
    await this.updateCurrentUserUsingToken(token);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next(null);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  async updateCurrentUserUsingToken(token: string): Promise<void> {
    const result = await this.apiService.get('account').toPromise();
    console.log(result);
    if (result.user) {
      const user = result.user;
      if (result.organizations) user.organizations = result.organizations;
      this.currentUserSubject.next(user);
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  async attemptAuth(loginRequest: LoginRequest): Promise<boolean> {
    console.log(`sending the request from service:  ${new Date().toLocaleTimeString()}`);
    const result = await this.apiService.post('account/login', loginRequest).toPromise();
    console.log(`got the response in service:  ${new Date().toLocaleTimeString()}`);
    if (result.accessToken) {
      await this.setAuth(result.accessToken);
      return true;
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
      return false;
    }
  }

  async checkUserNameAvailability(checkUsernameRequest: CheckUsernameRequest): Promise<boolean> {
    const result = await this.apiService.post('account/check-username/', checkUsernameRequest).toPromise();
    if (result.isUserNameAvailable) {
      return true;
    } else {
      return false;
    }
  }

  async attemptSignup(signupRequest: SignupRequest): Promise<boolean> {
    const result = await this.apiService.post('account/signup', signupRequest).toPromise();
    console.log(JSON.stringify(result));
    if (result instanceof HttpErrorResponse) {
      if (result.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', result.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(`Backend returned code ${result.status}, ` + `body was: ${result.error}`);
      }
      return false;
    } else {
      return true;
    }
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  hasCurrentUser(): boolean {
    return this.currentUserSubject.value != null;
  }
}
