import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskserviceService {
  private apiUrl = 'http://localhost:9090/task/'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  createTask(task: Task): Observable<Task> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Task>(`${this.apiUrl}/add`, task, { headers });
  }

  updateTask(id: number, task: Task): Observable<Task> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    console.log('Updating task with ID:', id, task);
  
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task, { headers });
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
