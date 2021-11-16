import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { UserService } from '../services/user.service';
import { ToastService } from 'src/app/services/toast.service';

import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { authResponse } from '../interfaces/interfaces';

import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public authSubject: BehaviorSubject<User | null>;
  private currentUser: User | null;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private toastService: ToastService,
    private translateService: TranslateService,
  ) {
    this.authSubject = new BehaviorSubject<User | null>(this.currentUser || null);
    this.translateService = translateService;
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${environment.API_URL}/authorization/sign-in`, { email, password })
      .pipe(
        map((token: authResponse) => {
          if (token) {
            this.setToken(token);
            this.userService.getUser().subscribe((user: User) => {
              this.authSubject.next(user);
              void this.router.navigate(['/users']);
              this.currentUser = user;
            });
          }
        }),
      )
      .pipe(
        catchError((err: any): Observable<any> => {
          this.toastService.showError(
            this.translateService.instant('authTostr.text'),
            this.translateService.instant('authTostr.title'),
          );
          return Observable.throw(err);
        }),
      );
  }

  logout(): Observable<any> {
    this.authSubject.next(null);
    void this.router.navigate(['']);
    return this.http
      .get<any>(
        `${environment.API_URL}/authorization/sign-out/${localStorage.getItem('refreshToken')}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        },
      )
      .pipe(
        map(() => {
          this.removeToken();
        }),
      );
  }

  refreshToken(): Observable<any> {
    console.log('start refresh');
    return this.http
      .post<any>(`${environment.API_URL}/authorization/refresh-token`, {
        accessToken: `${localStorage.getItem('accessToken')}`,
        refreshToken: `${localStorage.getItem('refreshToken')}`,
      })
      .pipe(
        map((res: any) => {
          console.log('refresh', res);
          this.setToken(res);
        }),
      );
  }

  private setToken(response: authResponse | null): void {
    if (response) {
      this.removeToken();
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      console.log('setToken', response);
    }
  }

  get authToken(): string {
    return localStorage.getItem('accessToken') || '';
  }

  public isAuthenticated(): boolean {
    return !!this.authToken;
  }

  private removeToken():void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
