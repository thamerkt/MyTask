import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
 
  private apiUrl = 'http://localhost:9090/auth'; 
  constructor(private http: HttpClient) {}

  getUsers(): Observable<user[]> {
    return this.http.get<user[]>(this.apiUrl);
  }
  
  Login(userData: { email: string, password: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Send the login request to the backend
    return this.http.post<any>(`${this.apiUrl}/login`, userData, { headers });
  }

  getUser(id: number): Observable<user> {
    return this.http.get<user>(`${this.apiUrl}/${id}`);
  }

  register(project: user): Observable<user> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<user>(`${this.apiUrl}/register`, project, { headers });
  }

  updateuser(id: number, user: user): Observable<user> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<user>(`${this.apiUrl}/${id}`, user, { headers });
  }

  deleteuser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
