import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Interviewer } from './../models/interviewer.model';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class InterviewerService extends ApiService<Interviewer> {
  constructor(private http: HttpClient) {
    super(http, Interviewer, '/api/interviewers');
  }
}
