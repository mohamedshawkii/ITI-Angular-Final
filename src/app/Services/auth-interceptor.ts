import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from './auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);

  // --- Skip attaching token for login/register requests ---
  if (
    req.url.includes('/login') ||
    req.url.includes('/register')
  ) {
    return next(req); // just forward the request without changes
  }

  const token = authService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(req);
};
