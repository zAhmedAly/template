import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: String;
  password: String;
  returnUrl: string;
  tokenTimer: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'] ||
      localStorage.getItem('returnUrl') ||
      '/dashboard';
    localStorage.setItem('returnUrl', this.returnUrl);
    console.log('LoginComponent ngOnInit this.returnUrl = ', this.returnUrl);

    // Get the query params
    // this.route.queryParams.subscribe(params => {
    //   console.log(
    //     'LoginComponent ngOnInit params[returnUrl] = ',
    //     params['returnUrl']
    //   );
    //   this.returnUrl = params['returnUrl'] || '/dashboard';
    // });
  }

  onLoginSubmit() {
    if (!this.email || !this.password) {
      console.log('inside onLoginSubmit --- Empty Email or Password');
      this.flashMessage.show('Enter Email and Password', {
        cssClass: 'alert-danger',
        timeout: 5000
      });
      this.router.navigate(['login']);
      return false;
    }

    const user = {
      email: this.email,
      password: this.password
    };

    this.authService.authenticateUser(user).subscribe(data => {
      console.log(
        'LoginComponent onLoginSubmit authenticateUser data = ',
        data
      );
      if (data.success) {
        const token = data.result.token;
        const user = {
          id: data.result.id,
          name: data.result.name,
          email: data.result.email,
          role: data.result.role
        };
        this.authService.storeUserData(token, user);
        const returnUrlx = localStorage.getItem('returnUrl');
        console.log('onLoginSubmit authenticateUser returnUrlx = ', returnUrlx);

        const time_to_login = Date.now() + 10 * 60; // 5 min
        localStorage.setItem('timer', JSON.stringify(time_to_login));
        console.log('Inside LoginComponent ... ' + data.msg);

        this.flashMessage.show(data.msg, {
          cssClass: 'alert-success',
          timeout: 3000
        });
        setTimeout(() => {
          console.log('Inside LoginComponent setTimeout ... Auto Logout');

          this.authService.logout();
          this.flashMessage.show('Your login session has expired', {
            cssClass: 'alert-warning',
            timeout: 10000
          });
          this.router.navigate(['/login']);
        }, 5 * 60 * 1000); // Auto Logoff after 5 mins
        // login successful so redirect to return url
        this.router.navigateByUrl(returnUrlx);
        // this.router.navigateByUrl(this.returnUrl);
      } else {
        console.log('Inside LoginComponent ... ' + data.msg);
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 3000
        });
        this.returnUrl = '/login';
      }
    });
  }
}
