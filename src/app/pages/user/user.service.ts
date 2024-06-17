import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://api-jm.vercel.app/api/api/users', { headers: this.headers });
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`https://api-jm.vercel.app/api/api/users/${id}`, { headers: this.headers });
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`https://api-jm.vercel.app/api/api/users/${user.id}`, user, { headers: this.headers });
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>('https://api-jm.vercel.app/api/api/users', user, { headers: this.headers });
  }

  deleteUser(user: User): Observable<User> {
    return this.http.delete<User>(`https://api-jm.vercel.app/api/api/users/${user.id}`, { headers: this.headers });
  }
}



