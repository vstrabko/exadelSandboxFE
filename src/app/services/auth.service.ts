import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { UserService } from '../services/user.service';
import { ToastService } from 'src/app/services/toast.service';

import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { authResponse } from '../interfaces/interfaces';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public authSubject: BehaviorSubject<User | null>;
  private currentUser: User | null;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private toastService: ToastService,
  ) {
    this.authSubject = new BehaviorSubject<User | null>(this.currentUser || null);
  }

  login(email: string, password: string): Observable<void> {
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
          } else {
            this.toastService.showError(
              'Please check carefully that all details are correct',
              'Authentication error',
            );
          }
        }),
      );
  }

  public logout(): void {
    localStorage.removeItem('accessToken');
    this.authSubject.next(null);
    void this.router.navigate(['']);
  }

  get authToken(): string {
    return localStorage.getItem('accessToken') || '';
  }

  public isAuthenticated(): boolean {
    return !!this.authToken;
  }

  private setToken(response: authResponse | null): void {
    if (response) {
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshTokentT', response.refreshToken);
    }
  }
}
