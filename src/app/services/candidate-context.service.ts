/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { candidateRequestData } from '../models/candidate-request-data.model';
import { ApiService } from './api.service';
import { IdName } from '../models/id-name.model';
import { Sandbox } from '../models/sandbox.model';
import { CandidateFormModel } from '../models/candidateForm.model';
import { Employee } from '../interfaces/interfaces';

import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

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

  private title: string = '';
  private text: string = '';
  private titleEr: string = '';
  private textEr: string = '';

  private englishLevels: IdName[] = [];
  private languages: IdName[] = [];
  private skills: IdName[] = [];
  private stackTechnologies: IdName[] = [];
  private availability: IdName[] = [];
  private statuses: IdName[] = [];
  private sandboxes: Sandbox[] = [];
  private mentors: Employee[] = [];
  private interviewers: Employee[] = [];
  private recruiters: Employee[] = [];
  private locations: IdName[] = [];

  getData<T>(dataArray: T[], currentUrl: string): [T[], Observable<T[]>] {
    super.apiUrl = currentUrl;
    const method = this.get();
    if (!dataArray.length) {
      method.subscribe((data: T[]) => dataArray.push(...data));
      return [dataArray, method];
    }
    return [dataArray, method];
  }

  getSandboxes<T>(dataArray: T[], currentUrl: string): [T[], Observable<T[]>] {
    super.apiUrl = currentUrl;
    const method = this.get();
    method.subscribe((data: T[]) => {
      while (dataArray.length) {
        dataArray.pop();
      }
      dataArray.push(...data);
    });
    return [dataArray, method];
  }

  getLanguages(): [IdName[], Observable<IdName[]>] {
    return this.getData<IdName>(this.languages, '/api/languages');
  }
  getLocation(): [IdName[], Observable<IdName[]>] {
    return this.getData<IdName>(this.locations, '/api/locations');
  }
  getEnglishLevels(): [IdName[], Observable<IdName[]>] {
    return this.getData<IdName>(this.englishLevels, '/api/languagelevels');
  }
  getSkills(): [IdName[], Observable<IdName[]>] {
    return this.getData<IdName>(this.skills, '/api/skills');
  }
  getStackTechnologies(): [IdName[], Observable<IdName[]>] {
    return this.getData<IdName>(this.stackTechnologies, '/api/stacktechnologies');
  }
  getSandbox(): [Sandbox[], Observable<Sandbox[]>] {
    return this.getSandboxes<Sandbox>(this.sandboxes, '/api/sandboxes');
  }
  getAvailability(): [IdName[], Observable<IdName[]>] {
    return this.getData<IdName>(this.availability, '/api/availabilitytypes');
  }
  getInterviewers(): [Employee[], Observable<Employee[]>] {
    return this.getData<Employee>(this.interviewers, '/api/interviewers');
  }
  getMentors(): [Employee[], Observable<Employee[]>] {
    return this.getData<Employee>(this.mentors, '/api/mentors');
  }
  getRecruiters(): [Employee[], Observable<Employee[]>] {
    return this.getData<Employee>(this.recruiters, '/api/recruiters');
  }
  getStatuses(): [IdName[], Observable<IdName[]>] {
    return this.getData<IdName>(this.statuses, '/api/statuses');
  }
  postCandidate(formData: CandidateFormModel): void {
    super.apiUrl = '/api/candidates';
    this.create(formData).subscribe(
      () => this.toastr.success(this.title, this.text),
      () => this.toastr.error(this.titleEr, this.textEr),
    );
  }
  postSandbox(formData: Sandbox): void {
    super.apiUrl = '/api/sandboxes';
    this.create(formData).subscribe(
      () => this.toastr.success(this.title, this.text),
      () => this.toastr.error(this.titleEr, this.textEr),
    );
  }
  putSandbox(formData: Sandbox): void {
    super.apiUrl = '/api/sandboxes';
    this.update(formData).subscribe(
      () => this.toastr.success(this.title, this.text),
      () => this.toastr.error(this.titleEr, this.textEr),
    );
  }
  translateLabels(): void {
    this.title = this.translateService.instant('tostr.title');
    this.text = this.translateService.instant('tostr.text');
    this.titleEr = this.translateService.instant('tostr.titleEr');
    this.textEr = this.translateService.instant('tostr.textEr');
  }
}
