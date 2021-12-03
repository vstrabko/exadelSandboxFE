import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

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
      .post<any>(`${environment.API_URL}/api/authorization/sign-in`, { email, password })
      .pipe(
        map((token: authResponse) => {
          if (token) {
            this.workWithToken(token);
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
        `${environment.API_URL}/api/authorization/sign-out/${this.getLSItem('refreshToken')}`,
        {
          headers: {
            Authorization: `Bearer ${this.getLSItem('accessToken')}`,
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
    return this.http
      .post<any>(`${environment.API_URL}/api/authorization/refresh-token`, {
        accessToken: this.getLSItem('accessToken'),
        refreshToken: this.getLSItem('refreshToken'),
      })
      .pipe(
        map((res: any) => {
          this.removeToken();
          this.setToken(res);
        }),
      );
  }

  userId(): string | undefined {
    return this.currentUser?._id;
  }

  private setToken(response: authResponse | null): void {
    if (response) {
      this.removeToken();
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
    }
  }

  get authToken(): string {
    return localStorage.getItem('accessToken') || '';
  }

  public isAuthenticated(): boolean {
    return !!this.authToken;
  }

  private removeToken(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  private getLSItem(key: string): string {
    const item = localStorage.getItem(key);
    return item ? item : '';
  }

  workWithToken(token: authResponse): void {
    this.setToken(token);
    this.userService.getUser().subscribe((user: User) => {
      this.authSubject.next(user);
      this.userService.setUser(user);
      void this.router.navigate(['/candidates']);
      this.currentUser = user;
    });
  }
}
