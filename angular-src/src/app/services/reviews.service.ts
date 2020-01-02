import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private apiUrl = 'http://localhost:5000/api/v1';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getReviews(bootcampId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/bootcamps/${bootcampId}/reviews`);
  }

  getReview(reviewId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/reviews/${reviewId}`);
  }

  addReview(bootcampId: string, newReview: any): Observable<any> {
    const token = this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    return this.http.post(
      `${this.apiUrl}/bootcamps/${bootcampId}/reviews`,
      newReview,
      httpOptions
    );
  }
}
