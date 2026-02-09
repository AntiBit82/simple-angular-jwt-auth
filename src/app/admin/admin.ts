import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  template: `
    <h2>Admin Area</h2>
    <button (click)="load()">Call /auth/admin</button>
    <p>{{ message }}</p>
  `
})
export class AdminComponent {
  message = '';

  constructor(private http: HttpClient) {}

  load() {
    this.http.get('http://localhost:8080/auth/admin', { responseType: 'text' })
      .subscribe(msg => this.message = msg);
  }
}