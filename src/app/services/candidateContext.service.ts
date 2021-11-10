import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { candidateRequestData } from '../models/candidateRequestData.model';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class CandidateContext extends ApiService<candidateRequestData> {
  constructor(private http: HttpClient) {
    super(http, candidateRequestData, '');
  }
  englishLevels: string[] = [];
  skills: string[] = [];

  getData(dataArray: string[], currentUrl: string): string[] {
    if (!dataArray.length) {
      super.apiUrl = currentUrl;
      this.get().subscribe((data: candidateRequestData[]): void =>
        data.forEach((item: candidateRequestData): number => dataArray.push(item.name)),
      );
      return dataArray;
    } 
    return dataArray;
  }

  getEnglishLevels(): string[] {
    return this.getData(this.englishLevels, '/api/languagelevels');
  }
  getSkills(): string[] {
    return this.getData(this.skills, '/api/skills');
  }
}
