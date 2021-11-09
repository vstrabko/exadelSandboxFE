import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { languageLevel } from '../models/languageLevels.model';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class LagnugageLevelService extends ApiService<languageLevel> {
  constructor(private http: HttpClient) {
    super(http, languageLevel, '/api/languagelevels');
  }
}
