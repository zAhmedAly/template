import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthData } from 'app/interfaces/auth-data';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {
    // this.isDev = true;  // Change to false before deployment
  }

  registerUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<AuthData>(`${this.apiUrl}/register`, user, {
      headers: headers
    });
  }

  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<AuthData>(`${this.apiUrl}/authenticate`, user);
  }

  getProfile() {
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.authToken
      })
    };

    return this.http.get<AuthData>(`${this.apiUrl}/profile`, httpOptions);
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    return this.authToken;
  }

  loggedIn() {
    this.loadToken();
    // console.log('decodeToken = ', this.jwtHelper.decodeToken(this.authToken));
    // console.log(
    //   'getTokenExpirationDate = ',
    //   this.jwtHelper.getTokenExpirationDate(this.authToken)
    // );
    // console.log(
    //   'isTokenExpired = ',
    //   this.jwtHelper.isTokenExpired(this.authToken)
    // );

    return (
      !this.authToken != null && !this.jwtHelper.isTokenExpired(this.authToken)
    );
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
