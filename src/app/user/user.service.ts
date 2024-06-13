import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8000/api/users');
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`http://localhost:8000/api/users/${id}`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`http://localhost:8000/api/users/${user.id}`, user);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:8000/api/users', user);
  }

  deleteUser(user: User): Observable<User> {
    return this.http.delete<User>(`http://localhost:8000/api/users/${user.id}`);
  }
}


