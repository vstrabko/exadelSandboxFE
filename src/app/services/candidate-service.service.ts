import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Candidate } from '../models/candidate.model';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class CandidateService extends ApiService<Candidate> {
  constructor(private http: HttpClient) {
    super(http, Candidate, '/api/candidates');
  }
}
