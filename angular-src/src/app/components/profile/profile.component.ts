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
    const userInfo = JSON.parse(this.authService.loadUserInfo());
    // console.log('ProfileComponent ngOnInit loadUserInfo userInfo = ', userInfo);

    this.authService.getProfile(userInfo.id).subscribe(
      profile => {
        // console.log('ProfileComponent ngOnInit getProfile profile = ', profile);
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
