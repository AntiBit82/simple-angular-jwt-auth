import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiResponse, User } from '../model/responses';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private api = '/auth';

  username = signal<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.restoreUserFromToken();
  }

  register(username: string, password: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.api}/register`, { username, password });
  }

  registerAdmin(username: string, password: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.api}/register-admin`, { username, password });
  }

  login(username: string, password: string): Observable<string> {
    return this.http.post(`${this.api}/login`, { username, password }, { responseType: 'text' });
  }

  listUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.api}/users`);
  }

  deleteUserById(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/users/${userId}`);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.decodeAndStoreUser(token);
  }

  get token() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.username.set(null);
    this.router.navigate(['/']);
  }

  isLoggedIn() {
    return !!this.token;
  }

  isAdmin() {
    if (!this.token) return false;
    const payload = JSON.parse(atob(this.token.split('.')[1]));
    return payload.role === 'ROLE_ADMIN';
  }

  private decodeAndStoreUser(token: string) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    // console.log('Decoded token payload:', payload);
    this.username.set(payload.sub);
  }

  private restoreUserFromToken() {
    const token = this.token;
    if (token) this.decodeAndStoreUser(token);
  }
}