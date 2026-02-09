import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AlertService } from '../service/alert.service';
import { catchError, throwError } from 'rxjs';
import { ApiError } from '../model/api-error';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const alert = inject(AlertService);

  return next(req).pipe(
    catchError(err => {
      console.log('ErrorInterceptor caught an error:', err.error);
      const apiError: ApiError = parseApiError(err);
      alert.error(apiError.message);

      return throwError(() => err);
    })
  );
};

function parseApiError(err: any): ApiError {
  let apiError: ApiError = {
    timestamp: new Date().toISOString(),
    status: err.status || 0,
    error: 'Unknown',
    message: 'An unexpected error occurred'
  };

  // Case 1: backend returned JSON string
  if (typeof err.error === 'string') {
    try {
      const parsed = JSON.parse(err.error);
      apiError = { ...apiError, ...parsed };
    } catch {
      // ignore JSON parse errors
    }
  }

  // Case 2: backend returned JSON object
  else if (err.error && typeof err.error === 'object') {
    apiError = { ...apiError, ...err.error };
  }

  return apiError;
}