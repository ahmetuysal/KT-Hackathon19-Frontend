import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { DialogService } from '../shared/services/dialog.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  constructor(public authService: AuthService, private dialogService: DialogService, private router: Router) {}

  ngOnInit() {}

  showSignIn(): void {
    this.dialogService.showSignIn();
  }

  showSignUp(): void {
    this.dialogService.showSignUp();
  }

  signOut(): void {
    this.authService.signOut();
    this.router.navigate(['/']);
  }
}
