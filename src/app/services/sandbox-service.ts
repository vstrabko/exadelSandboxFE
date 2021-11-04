import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sandbox } from '../models/sandbox.model';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class SandboxService extends ApiService<Sandbox> {
  constructor(private http: HttpClient) {
    super(http, Sandbox, 'https://jsonplaceholder.typicode.com/albums');
  }
}
