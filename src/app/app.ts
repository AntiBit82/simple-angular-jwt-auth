import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './service/auth.service';
import { AlertComponent } from './alert/alert';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    AlertComponent
  ],
  template: `
    <app-alert></app-alert>

    <nav>
      <a routerLink="/">Home</a>

      @if (!auth.isLoggedIn()) {
        <a routerLink="/login">Login</a>
        <a routerLink="/register">Register</a>
      }

      @if (auth.isAdmin()) {
        <a routerLink="/admin">Admin</a>
      }

      @if (auth.isLoggedIn()) {
        <a routerLink="/users">Users</a>
        <button (click)="auth.logout()">Logout</button>
      }
    </nav>

    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(public auth: AuthService) {}
}