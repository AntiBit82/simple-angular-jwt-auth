import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export type AlertType = 'success' | 'error' | 'info' | 'warning';

@Injectable({ providedIn: 'root' })
export class AlertService {

  constructor(private snack: MatSnackBar) {}

  show(message: string, type: AlertType = 'info') {
    this.snack.open(message, undefined, {
      duration: 3000,
      panelClass: [`alert-${type}`]
    });
  }

  success(msg: string) {
    this.show(msg, 'success');
  }

  error(msg: string) {
    this.show(msg, 'error');
  }

  info(msg: string) {
    this.show(msg, 'info');
  }

  warning(msg: string) {
    this.show(msg, 'warning');
  }
}