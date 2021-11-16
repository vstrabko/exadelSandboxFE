import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: any) => {
        let countErr = 0;
        if (err.status === 401 && countErr <= 1) {
          countErr++;
          console.log('count 401', countErr);
          this.authService.refreshToken().subscribe();
        } else {
          this.authService.logout().subscribe();
        }
        return observableThrowError(err);
      }),
    );
  }
}
