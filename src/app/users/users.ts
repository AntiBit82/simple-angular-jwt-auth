import { Component, signal } from '@angular/core';
import { User } from '../model/responses';
import { AuthService } from '../service/auth.service';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class UsersComponent {
  users = signal<User[]>([]);

  constructor(private authService: AuthService, private alertService: AlertService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.authService.listUsers().subscribe(users => {
      console.log('Received users:', users);
      this.users.set(users);
    });
  }

  get isAdmin() {
    return this.authService.isAdmin();
  }

  deleteUser(userId: number, username: string) {
    this.authService.deleteUserById(userId).subscribe(() => {
      console.log(`Deleted user with ID ${userId}`);
      this.alertService.success(`User '${username}' deleted successfully`);
      this.loadUsers(); 
    });
  }
}
