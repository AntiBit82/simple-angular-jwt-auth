import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Login</h2>
    <input [(ngModel)]="username" placeholder="Username">
    <input [(ngModel)]="password" placeholder="Password" type="password">
    <button (click)="login()">Login</button>
  `
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.username, this.password).subscribe(token => {
      this.auth.saveToken(token);
      this.router.navigate(['/']);
    });
  }
}