import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../service/alert.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
    MatButtonModule,
    MatCheckboxModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    admin: new FormControl(false)
  });

  constructor(
    private auth: AuthService,
    private alert: AlertService
  ) {}

  register() {
    if (this.form.invalid) {
      this.alert.error('Please fill in all required fields.');
      return;
    }
    
    const { username, password, admin } = this.form.value;
    if (admin) {
      this.registerAdmin(username!, password!);
    } else {
      this.registerUser(username!, password!);
    }
  }

  registerUser(username: string, password: string) {
    this.auth.register(username, password).subscribe(res => {
      this.alert.success(res.message);
      this.form.reset();
    });
  }

  registerAdmin(username: string, password: string) {
    this.auth.registerAdmin(username, password).subscribe(res => {
      this.alert.success(res.message);
      this.form.reset();
    });
  }
}