import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    localStorage.setItem('returnUrl', '/profile');
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
