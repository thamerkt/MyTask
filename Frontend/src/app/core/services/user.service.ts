import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { user } from './../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:9090/auth/';

  constructor(private http: HttpClient) {}

  // Register a new user
  register(user: user): Observable<any> {
    return this.http.post(`${this.baseUrl}register`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }).pipe(
      map((response: any) => {
        // Handle successful response
        console.log('Registration Response:', response);
        return response; // You can modify the response here if needed
      }),
      catchError((error) => {
        // Handle errors
        console.error('Registration Error:', error);
        return throwError(() => error); // Re-throw the error to the component
      })
    );
  }

  // Login a user
  login(user: Partial<user>): Observable<any> {
    return this.http.post(`${this.baseUrl}login`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }).pipe(
      map((response: any) => {
        // Handle successful response
        console.log('Login Response:', response);
        return response; // You can modify the response here if needed
      }),
      catchError((error) => {
        // Handle errors
        console.error('Login Error:', error);
        console.log(user);
        return throwError(() => error); // Re-throw the error to the component
      })
    );
  }
 
  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}logout`, {}); // POST request to /logout
  }
}
