/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { candidateRequestData } from '../models/candidate-request-data.model';
import { ApiService } from './api.service';
import { IdName } from '../models/id-name.model';
import { Sandbox } from '../models/sandbox.model';

@Injectable({ providedIn: 'root' })
export class CandidateContextService extends ApiService<candidateRequestData> {
  constructor(private http: HttpClient) {
    super(http, candidateRequestData, '');
  }
  englishLevels: IdName[] = [];
  skills: IdName[] = [];
  availability: IdName[] = [];
  sandboxes: Sandbox[] = [];

  getData(dataArray: any[], currentUrl: string): any[] {
    if (!dataArray.length) {
      super.apiUrl = currentUrl;
      this.get().subscribe((data: candidateRequestData[]): void =>
        data.forEach((item: any): number => dataArray.push(item)),
      );
      return dataArray;
    }
    return dataArray;
  }

  getEnglishLevels(): IdName[] {
    return this.getData(this.englishLevels, '/api/languagelevels');
  }
  getSkills(): IdName[] {
    return this.getData(this.skills, '/api/skills');
  }
  getSandbox(): Sandbox[] {
    return this.getData(this.sandboxes, '/api/sandboxes');
  }
  getAvailability(): IdName[] {
    return this.getData(this.availability, '/api/availabilitytypes');
  }
}
