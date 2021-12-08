import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Interview } from '../models/interview.model';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class PostInterviewService extends ApiService<Interview> {
  constructor(private http: HttpClient) {
    super(http, Interview, '/api/events/interview-time');
  }
}
