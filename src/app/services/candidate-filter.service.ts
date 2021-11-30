import { Candidate } from 'src/app/models/candidate.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class CandidateServiceFilter extends ApiService<Candidate> {
  constructor(private http: HttpClient) {
    super(http, Candidate, '/api/candidates/filter');
  }
}
