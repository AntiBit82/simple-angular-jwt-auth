import { Injectable, signal } from '@angular/core';

export type AlertType = 'success' | 'error' | 'info' | 'warning';

@Injectable({ providedIn: 'root' })
export class AlertService {
  message = signal<string | null>(null);
  type = signal<AlertType>('info');

  show(msg: string, type: AlertType = 'info') {
    this.message.set(msg);
    this.type.set(type);

    setTimeout(() => this.message.set(null), 3000);
  }

  success(msg: string) {
    this.show(msg, 'success');
  }

  error(msg: string) {
    this.show(msg, 'error');
  }
}