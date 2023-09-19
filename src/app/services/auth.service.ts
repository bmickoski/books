import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  socialAuthService = inject(SocialAuthService);
  router = inject(Router);
  constructor() {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('loggedIn');
  }

  login(): void {
    localStorage.setItem('loggedIn', 'true');
  }

  logout(): void {
    this.socialAuthService.signOut();
    localStorage.removeItem('loggedIn');
    this.router.navigateByUrl('login');
  }
}
