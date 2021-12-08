import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService extends ApiService<User> {
  public user: User;
  constructor(private http: HttpClient) {
    super(http, User, '/api/users/user-info');
  }
  setUser(user: User): void {
    this.user = user;
  }
}
