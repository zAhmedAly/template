import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BootcampsService {
  private apiUrl = 'http://localhost:5000/api/v1';

  constructor(private http: HttpClient) {}

  getBootcamps(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/bootcamps`)
      .pipe(catchError(this.handleError));
  }

  getBootcamp(bootcampId: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/bootcamps/${bootcampId}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
    } else {
      console.error('Server Side Error :', errorResponse);
    }
    // return an observable with a meaningful error message to the end user
    return throwError(
      'There is a problem with the service, We are notified & working on it. Please try again later.'
    );
  }
}
