import { Component, signal } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  template: `
    <h2>Admin Area</h2>
    <button (click)="loadAdminTestMessage()">Call /auth/admin</button>
    <p>{{ message() }}</p>
  `
})
export class AdminComponent {
  message = signal('');

  constructor(private apiService: ApiService) {}

  loadAdminTestMessage() {
    this.apiService.getAdminTestMessage().subscribe(msg => {
      console.log('Received message from /auth/admin:', msg);
      this.message.set(msg);
    });
  }
}
