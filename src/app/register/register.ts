import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <h2>Register</h2>

    <form [formGroup]="form">
      <input formControlName="username" placeholder="Username">
      <input formControlName="password" placeholder="Password" type="password">
    </form>

    <button (click)="register()">Register</button>
    <button (click)="registerAdmin()">Register Admin</button>
  `
})
export class RegisterComponent {

  form = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private auth: AuthService,
    private alert: AlertService
  ) {}

  register() {
    const { username, password } = this.form.value;

    this.auth.register(username!, password!).subscribe(res => {
      this.alert.success(res.message);
      this.form.reset();
    });
  }

  registerAdmin() {
    const { username, password } = this.form.value;

    this.auth.registerAdmin(username!, password!).subscribe(res => {
      this.alert.success(res.message);
      this.form.reset();
    });
  }
}