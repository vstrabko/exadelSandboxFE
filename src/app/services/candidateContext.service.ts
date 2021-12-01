/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { candidateRequestData } from '../models/candidateRequestData.model';
import { ApiService } from './api.service';
import { Sandbox } from '../models/sandbox.model';
import { IdName } from '../models/id-name.model';

@Injectable({ providedIn: 'root' })
export class CandidateContext extends ApiService<candidateRequestData> {
  constructor(private http: HttpClient) {
    super(http, candidateRequestData, '');
  }
  englishLevels: IdName[] = [];
  skills: IdName[] = [];
  statuses: IdName[] = [];
  mentors: IdName[] = [];
  sandboxes: Sandbox[] = [];
  locations: Location[] = [];

  getData(dataArray: any[], currentUrl: string): any[] {
    if (!dataArray.length) {
      super.apiUrl = currentUrl;
      this.get().subscribe((data: candidateRequestData[]): void =>
        data.forEach((item: candidateRequestData): number => dataArray.push(item.name)),
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
  getStatuses(): IdName[] {
    return this.getData(this.statuses, '/api/statuses');
  }
  getLocations(): IdName[] {
    return this.getData(this.locations, '/api/locations');
  }
  getSandbox(): Sandbox[] {
    return this.getData(this.sandboxes, '/api/sandboxes');
  }
  getMentors(): Sandbox[] {
    return this.getData(this.mentors, '/api/mentors');
  }
}
