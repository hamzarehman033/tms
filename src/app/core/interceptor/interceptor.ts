import { inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpEventType, HttpHandlerFn } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../service/auth.service';

export function AppInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const token = inject(AuthService).token;
    const newReq = req.clone({
        headers: req.headers.append('Authorization', `Bearer ${token}`),
    });
    return next(newReq);
}