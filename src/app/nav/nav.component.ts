import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  ToDoUser: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  showSignIn(): void {
    // TODO: Prompt SignIn
  }

  showSignUp(): void {
    // TODO: Prompt SignUp
  }

  signOut(): void {
    // TODO: signOut
    this.router.navigate(['/']);
  }
}
