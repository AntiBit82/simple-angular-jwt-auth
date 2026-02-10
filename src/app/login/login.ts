import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;

  username = '';
  password = '';

  constructor(private auth: AuthService, private alert: AlertService, private router: Router) {}

  login() {
    if (this.loginForm.invalid) {
      this.alert.error('Please fill in all required fields.');
      return;
    }

    this.auth.login(this.username, this.password).subscribe(token => {
      this.auth.saveToken(token);
      this.router.navigate(['/']);
    });
  }
}