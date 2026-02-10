import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { AlertService } from '../service/alert.service';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
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