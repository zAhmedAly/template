import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';

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

    this.authService.getProfile().subscribe(
      profile => {
        // console.log(profile);
        const user = {
          id: profile.result.id,
          name: profile.result.name,
          username: profile.result.username,
          email: profile.result.email
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
