import { Component, signal } from '@angular/core';
import { ApiService } from '../service/api.service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
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