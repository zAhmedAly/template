import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private apiUrl = 'http://localhost:5000/api/v1';

  constructor(private http: HttpClient) {}

  getReviews(bootcampId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/bootcamps/${bootcampId}/reviews`);
  }

  getReview(reviewId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/reviews/${reviewId}`);
  }

  addReview(bootcampId: string, newReview: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/bootcamps/${bootcampId}/reviews`,
      newReview
    );
  }
}
