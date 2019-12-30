import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  returnUrl: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = localStorage.getItem('returnUrl') || '/dashboard';
    localStorage.setItem('returnUrl', this.returnUrl);
    console.log('AppComponent ngOnInit this.returnUrl = ', this.returnUrl);

    // Get the query params
    // this.route.queryParams.subscribe(params => {
    //   console.log(
    //     'LoginComponent ngOnInit params[returnUrl] = ',
    //     params['returnUrl']
    //   );
    //   this.returnUrl = params['returnUrl'] || '/';
    // });

    // if (!this.authService.loggedIn()) {
    const timer = JSON.parse(localStorage.getItem('timer'));
    const now = Date.now();

    // console.log('timer is = ', timer);
    // console.log('Date.now() is = ', now);
    console.log('Date.now() - timer =', now - timer);

    if (timer && Date.now() - timer > 1 * 60 * 1000) {
      // Auto Logoff after 1 mins
      console.log('Inside AppComponent ... Auto LogOut');
      this.authService.logout();
      this.flashMessage.show('Your session has expired', {
        cssClass: 'alert-warning',
        timeout: 10000
      });
      this.router.navigateByUrl(this.returnUrl);
    }
  }
}
