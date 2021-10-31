import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

import { UserService } from '../services/user.service';
import { ToastService } from 'src/app/services/toast.service';

import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public userSave: Partial<User>;
  public authSubject: BehaviorSubject< Partial<User>> = new BehaviorSubject({});

  constructor(private http: HttpClient,
              private userService: UserService,
              private router: Router,
              private toastService: ToastService) {
  }
  get token(): Partial<User> {
    return  this.userSave || ''
};

  login(username: string, password: string): Observable<Partial<User>> {
    const listUsers = this.userService.get();

    return listUsers.pipe(
      map((user: User[]) => {
        const userFilter = user.filter((i: User) => i.mail === username && i.pass === password)[0];
        if (userFilter) {
          this.userSave = userFilter;
          this.authSubject.next(userFilter),
          void this.router.navigate(['/sandbox']);

        } else {
          this.toastService.showError( 'Please check carefully that all details are correct.', 'Authentication error')
        }
        return userFilter; //моковое получение юзера, до получения инфы с бэка
      }),
    );
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
  logout(): void {
    this.userSave = {};
    this.authSubject.next({})
    void this.router.navigate(['']);
  }
}
