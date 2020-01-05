import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpErrorResponse,
  HttpEvent
} from '@angular/common/http';

import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.authService.loadToken();
    // const authRequest = req.clone({
    //   headers: req.headers.set('Authorization', authToken)
    // });

    console.log('AuthInterceptor intercept authToken = ', authToken);

    const authRequest = req.clone();
    // authRequest.headers.set('Content-Type', 'application/json');
    authRequest.headers.set('Authorization', 'Bearer ' + authToken);

    console.log('AuthInterceptor intercept authRequest = ', authRequest);

    // return next.handle(authRequest);
    //.pipe(
    //   tap(
    //     (event: HttpEvent<any>) => {
    //       if (event instanceof HttpResponse) {
    //         console.log('event instanceof HttpResponse = ', event);

    //         // do stuff with response if you want
    //       }
    //     },
    //     (err: any) => {
    //       if (err instanceof HttpErrorResponse) {
    //         console.log('err instanceof HttpErrorResponse = ', err);
    //         if (err.status === 401) {
    //           // redirect to the login route
    //           // or show a modal
    //           this.authService.logout();
    //           this.flashMessage.show('You are logged out', {
    //             cssClass: 'alert-danger',
    //             timeout: 3000
    //           });
    //           this.router.navigate(['/login']);
    //           return false;
    //         }
    //       }
    //     }
    //   )
    // );

    return next.handle(authRequest);
    // .pipe(
    //   tap((event: HttpEvent<any>) => {
    //     if (event instanceof HttpResponse) {
    //       // do stuff with response if you want
    //       console.log(
    //         'AuthInterceptor event instanceof HttpResponse = ',
    //         event
    //       );
    //     }
    //   }),
    //   catchError(response => {
    //     if (response instanceof HttpErrorResponse) {
    //       console.log(
    //         'AuthInterceptor err instanceof HttpErrorResponse = ',
    //         response
    //       );
    //       if (response.status === 401) {
    //         console.log(
    //           'AuthInterceptor 401 UnAuthorized Request = ',
    //           response.error.error
    //         );
    //         this.authService.logout();
    //         this.flashMessage.show(response.error.error, {
    //           cssClass: 'alert-danger',
    //           timeout: 3000
    //         });
    //         this.router.navigate(['/login']);
    //       }
    //       if (response.status === 400) {
    //         console.log(
    //           'AuthInterceptor 400 UnAuthorized Request = ',
    //           response.error.error
    //         );
    //         this.flashMessage.show('You already reviewed this bootcamp', {
    //           cssClass: 'alert-danger',
    //           timeout: 3000
    //         });
    //       }
    //     }
    //     return throwError(response.error.error);
    //   })
    // );
  }
}
