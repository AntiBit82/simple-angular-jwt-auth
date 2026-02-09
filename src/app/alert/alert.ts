import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (alert.message()) {
      <div class="alert" [class]="alert.type()">
        {{ alert.message() }}
      </div>
    }
  `,
  styles: [`
    .alert {
      padding: 12px;
      border-radius: 4px;
      margin: 10px;
      border: 1px solid transparent;
    }

    .success {
      background: #d4edda;
      color: #155724;
      border-color: #c3e6cb;
    }

    .error {
      background: #f8d7da;
      color: #721c24;
      border-color: #f5c6cb;
    }

    .info {
      background: #d1ecf1;
      color: #0c5460;
      border-color: #bee5eb;
    }

    .warning {
      background: #fff3cd;
      color: #856404;
      border-color: #ffeeba;
    }
  `]
})
export class AlertComponent {
  constructor(public alert: AlertService) {}
}