import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private apiUrl = 'http://localhost:5000/api/v1';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getReviews(bootcampId: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/bootcamps/${bootcampId}/reviews`)
      .pipe(catchError(this.handleError));
  }

  getReview(reviewId: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/reviews/${reviewId}`)
      .pipe(catchError(this.handleError));
  }

  addReview(bootcampId: string, newReview: any): Observable<any> {
    const token = this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    return this.http
      .post(
        `${this.apiUrl}/bootcamps/${bootcampId}/reviews`,
        newReview,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error(
        'ReviewsService Client Side Error :',
        errorResponse.error.message
      );
    } else {
      console.error('ReviewsService Server Side Error :', errorResponse);
    }
    // return an observable with a meaningful error message to the end user
    return throwError(
      'Problem with the Reviews Service, We are notified & working on it. Please try again later.'
    );
  }
}
