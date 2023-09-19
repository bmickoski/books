import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgSwitch, NgSwitchDefault, NgSwitchCase } from '@angular/common';
import { SocialLoginModule } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    NgSwitch,
    NgSwitchDefault,
    NgSwitchCase,
    RouterOutlet,
    SocialLoginModule,
  ],
})
export class AppComponent {
  title = 'books';
}
