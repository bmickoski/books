import { Route, Router } from '@angular/router';
import { WorkspaceComponent } from './workspace/workspace.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { inject } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { CategoriesComponent } from './categories/categories.component';
import { HomeComponent } from './home/home.component';

export const routes: Route[] = [
  {
    path: '',
    canActivate: [
      () => {
        const authService = inject(AuthService);
        const router = inject(Router);
        if (authService.isLoggedIn()) {
          return true;
        } else {
          router.navigateByUrl('login');
          return false;
        }
      },
    ],
    component: WorkspaceComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'books',
        component: CategoriesComponent,
      },
      {
        path: 'favorites',
        component: FavoritesComponent,
      },
    ],
  },
  { path: 'login', component: LoginComponent },
];
