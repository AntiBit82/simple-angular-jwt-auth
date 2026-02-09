import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { AdminComponent } from './admin/admin';
import { AdminGuard } from './guard/admin-guard';
import { UsersComponent } from './users/users';
import { AuthGuard } from './guard/auth-guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
];