import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent {
  authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
