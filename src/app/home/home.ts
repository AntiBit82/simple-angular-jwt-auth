import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h1>Welcome</h1>
     @if(auth.isLoggedIn()) {
      <button (click)="logout()">Logout</button>
    }

    @if(auth.isLoggedIn()) {
      <p>You are logged in</p>
    }
    @if(auth.isAdmin()) {
      <p>You are an admin</p>
    }

    @if(auth.isAdmin()) {
      <a routerLink="/admin">Admin Area</a>
    }
  `
})
export class HomeComponent {
  constructor(public auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}