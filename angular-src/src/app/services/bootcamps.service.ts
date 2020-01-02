import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BootcampsService {
  private apiUrl = 'http://localhost:5000/api/v1';

  constructor(private http: HttpClient) {}

  getBootcamps(): Observable<any> {
    return this.http.get(`${this.apiUrl}/bootcamps`);
  }

  getBootcamp(bootcampId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/bootcamps/${bootcampId}`);
  }
}
