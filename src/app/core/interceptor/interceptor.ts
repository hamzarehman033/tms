import { inject } from '@angular/core';
import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

export function AppInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);
  const router = inject(Router);

  let modifiedReq = req;

  if (!req.url.includes('/login')) {
    const token = authService.getToken();
    if (token) {
      modifiedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  }

  return next(modifiedReq).pipe(
    tap((data: any) => {
      const newToken = data?.body?.token?.newAccessToken;
      if (newToken) {
        const getUser = localStorage.getItem('user');
        if (getUser) {
          const user = JSON.parse(getUser);
          user.token = newToken;
          localStorage.setItem('user', JSON.stringify(user));
        }
      }
    }),
    catchError((error) => {
      if (error.status === 401) {
        localStorage.removeItem('user');
        router.navigateByUrl('/login');
      }
      return throwError(() => error);
    })
  );
}
