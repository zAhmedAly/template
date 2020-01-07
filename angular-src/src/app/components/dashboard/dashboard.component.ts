import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { parse } from 'querystring';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: Object;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    localStorage.setItem('returnUrl', '/dashboard');
    const userInfo = JSON.parse(this.authService.loadUserInfo());
    // console.log(
    //   'DashboardComponent ngOnInit loadUserInfo userInfo = ',
    //   userInfo
    // );

    this.authService.getProfile(userInfo.id).subscribe(
      profile => {
        // console.log(
        //   'DashboardComponent ngOnInit getProfile profile = ',
        //   profile
        // );
        const user = {
          id: profile.result.id,
          name: profile.result.name,
          email: profile.result.email,
          role: profile.result.role
        };
        this.user = user;
      },
      err => {
        console.log(err);
        return false;
      }
    );
  }
}
