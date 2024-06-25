// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../pages/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://api-jm.vercel.app/api/login';
  public user: User | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
      'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
      'Access-Control-Allow-Credentials': 'true',
    }),
  };

  login(email: string, password: string): Observable<User> {
    return this.http.post<{ user: User }>(this.apiUrl, { email, password }, this.httpOptions).pipe(
      map(response => response.user),
      tap(user => {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/']);
      }),
      catchError(error => {
        console.error('Login error', error);
        return throwError(() => new Error('Invalid credentials'));
      })
    );
  }

  logout(): void {
    this.user = null;
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
