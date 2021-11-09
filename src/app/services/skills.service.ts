import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { skills } from '../models/skills.model';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class SkillsService extends ApiService<skills> {
  constructor(private http: HttpClient) {
    super(http, skills, '/api/skills');
  }
}
