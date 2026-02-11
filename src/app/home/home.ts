import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../service/api.service';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  constructor(public auth: AuthService, private api: ApiService, private alert: AlertService) {}

  testApi(admin: boolean) {
    this.api.getTestMessage(admin).subscribe(msg => {
      console.log(`Received message from /api/test/${admin ? 'admin' : 'user'}:`, msg);
      this.alert.success(msg);  
    });
  }
}