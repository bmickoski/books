import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/routes';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([
        (req, next) => {
          // We can use the inject() function inside this function
          // For example: inject(AuthService)
          return next(req);
        },
      ])
    ),
    provideRouter(routes),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false, //keeps the user signed in
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '422027111760-2vp51qegva89irqlkdiq0n429ngtm2go.apps.googleusercontent.com'
            ), // your client id
          },
        ],
      },
    },
  ],
}).catch((err) => console.error('Error', err));
