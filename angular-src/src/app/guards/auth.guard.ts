import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      console.log('Inside AuthGuard ... You need to Login to access this page');
      this.flashMessage.show('Login to access this page', {
        cssClass: 'alert-danger',
        timeout: 5000
      });
      this.router.navigate(['/login'], {
        queryParams: {
          returnUrl: state.url
        }
      });
      return false;
    }
  }
}
