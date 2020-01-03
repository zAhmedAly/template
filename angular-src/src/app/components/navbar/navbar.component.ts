import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  returnUrl: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  onLogoutClick() {
    this.returnUrl = localStorage.getItem('returnUrl') || '/';
    localStorage.setItem('returnUrl', this.returnUrl);
    console.log('NavbarComponent ngOnInit this.returnUrl = ', this.returnUrl);

    this.authService.logout();
    this.flashMessage.show('You are now logged out', {
      cssClass: 'alert-success',
      timeout: 3000
    });
    this.router.navigateByUrl(this.returnUrl);
    return false;
  }
}
