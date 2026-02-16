import { Component, ViewChild, signal } from '@angular/core';
import { User } from '../model/responses';
import { AuthService } from '../service/auth.service';
import { AlertService } from '../service/alert.service';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class UsersComponent {
  users = signal<User[]>([]);
  dataSource = new MatTableDataSource<User>([]);
  displayedColumns = ['id', 'username', 'role', 'actions'];

  @ViewChild(MatPaginator) set matPaginator(p: MatPaginator) {
    if (p) this.dataSource.paginator = p;
  }

  @ViewChild(MatSort) set matSort(s: MatSort) {
    if (s) this.dataSource.sort = s;
  }

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.authService.listUsers().subscribe(users => {
      users.sort((a, b) => a.username.localeCompare(b.username));
      this.users.set(users);
      this.dataSource.data = users;
    });
  }

  get isAdmin() {
    return this.authService.isAdmin();
  }

  deleteUser(userId: number, username: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete User',
        message: `Are you sure you want to delete '${username}'?`
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) return;

      this.authService.deleteUserById(userId).subscribe(() => {
        this.alertService.success(`User '${username}' deleted successfully`);
        this.loadUsers();
      });
    });
  }
}