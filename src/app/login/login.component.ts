import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SocialAuthService,
  GoogleSigninButtonModule,
} from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, GoogleSigninButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  router = inject(Router);
  socialAuthService = inject(SocialAuthService);
  authService = inject(AuthService);
  constructor() {
    inject(SocialAuthService).authState.subscribe((user) => {
      if (user) {
        console.log(user);
        this.authService.login();
        this.router.navigateByUrl('');
      }
    });
  }
}
