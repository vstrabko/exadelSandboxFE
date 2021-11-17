import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService extends ApiService<User> {
  constructor(private http: HttpClient) {
    super(http, User, '../../assets/mock-data/users.json');
  }
}
