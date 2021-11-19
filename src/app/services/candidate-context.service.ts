/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { candidateRequestData } from '../models/candidate-request-data.model';
import { ApiService } from './api.service';
import { IdName } from '../models/id-name.model';
import { Sandbox } from '../models/sandbox.model';
import { CandidateFormModel } from '../models/candidateForm.model';

import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class CandidateContextService extends ApiService<candidateRequestData> {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private translateService: TranslateService,
  ) {
    super(http, candidateRequestData, '');
    this.translateService.onLangChange.subscribe(() => {
      this.translateLabels();
    });
    this.translateLabels();
  }

  title: string = '';
  text: string = '';

  englishLevels: IdName[] = [];
  skills: IdName[] = [];
  availability: IdName[] = [];
  sandboxes: Sandbox[] = [];

  getData<T>(dataArray: T[], currentUrl: string): T[] {
    if (!dataArray.length) {
      super.apiUrl = currentUrl;
      this.get().subscribe((data: T[]) => dataArray.push(...data));
      return dataArray;
    }
    return dataArray;
  }

  getEnglishLevels(): IdName[] {
    return this.getData<IdName>(this.englishLevels, '/api/languagelevels');
  }
  getSkills(): IdName[] {
    return this.getData<IdName>(this.skills, '/api/skills');
  }
  getSandbox(): Sandbox[] {
    return this.getData<Sandbox>(this.sandboxes, '/api/sandboxes/all');
  }
  getAvailability(): IdName[] {
    return this.getData<IdName>(this.availability, '/api/availabilitytypes');
  }
  getStatuses(): IdName[] {
    return this.getData<IdName>(this.availability, '/api/statuses');
  }

  postCandidate(formData: CandidateFormModel): void {
    super.apiUrl = '/api/candidates';
    this.create(formData);
    this.toastr.success(this.title, this.text);
  }

  translateLabels(): void {
    this.title = this.translateService.instant('tostr.title');
    this.text = this.translateService.instant('tostr.text');
  }
}
