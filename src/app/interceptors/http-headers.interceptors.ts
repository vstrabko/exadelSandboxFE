import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable, Subject, throwError, ObservableInput, Subscriber, empty } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
  refreshTokenInProgress = false;
  tokenRefreshedSource = new Subject();
  tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    request = this.addAuthHeader(request);
    return next.handle(request).pipe(
      catchError((error: any) => {
        return this.handleResponseError(error, request, next);
      }),
    );
  }

  addAuthHeader(request: HttpRequest<any>): HttpRequest<any> {
    const accessToken = localStorage.getItem('accessToken') || '';
    if (accessToken) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
    return request;
  }

  refreshToken(): Observable<any> {
    if (this.refreshTokenInProgress) {
      return new Observable((observer: Subscriber<any>) => {
        this.tokenRefreshed$.subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshTokenInProgress = true;

      return this.authService.refreshToken().pipe(
        tap(() => {
          this.refreshTokenInProgress = false;
          this.tokenRefreshedSource.next();
        }),
        catchError((err: Error): ObservableInput<any> => {
          this.refreshTokenInProgress = false;
          this.authService.logout();
          return throwError(err);
        }),
      );
    }
  }

  handleResponseError(
    error: Response,
    request?: HttpRequest<any> | undefined,
    next?: HttpHandler | undefined,
  ): Observable<any> {
    if (error.status === 401) {
      return this.refreshToken().pipe(
        switchMap(() => {
          if (request) {
            request = this.addAuthHeader(request);
            return next ? next.handle(request) : empty();
          }
          return empty();
        }),
        catchError((err: Response) => {
          if (err.status !== 401) {
            return this.handleResponseError(err);
          } else {
            this.authService.logout();
            return empty();
          }
        }),
      );
    }
    return throwError(error);
  }
}
