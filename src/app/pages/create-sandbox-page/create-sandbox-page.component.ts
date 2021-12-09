import { OnInit } from '@angular/core';
/* eslint-disable @typescript-eslint/unbound-method */
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Sandbox } from 'src/app/models/sandbox.model';

import { Employee } from '../../interfaces/interfaces';
import { CandidateContextService } from 'src/app/services/candidate-context.service';
import { IdName } from 'src/app/models/id-name.model';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-create-sandbox-page',
  templateUrl: './create-sandbox-page.component.html',
  styleUrls: ['./create-sandbox-page.component.scss'],
})
export class CreateSandboxPageComponent implements OnInit {
  constructor(private candidateContextService: CandidateContextService, private http: HttpClient) {}
  public sandboxes: Sandbox[] = [];
  public sandboxChosen: Partial<Sandbox> = {};
  public languages: IdName[];
  public stackTechnologies: IdName[];
  public recruiters: IdName[];
  public interviewers: IdName[];
  public mentors: IdName[];
  public listRecruiters: Employee[];
  public listInterviewers: Employee[];
  public listMentors: Employee[];
  public sandboxId: string;
  public sandstats: string[] = [
    'Draft',
    'Inprogress',
    'Archive',
    'Application',
    'Registration',
    'Active',
  ];
  public arrTech: string[] = [];
  public arrLang: string[] = [];
  public arrInterviewers: string[] = [];
  public arrRecruiters: string[] = [];
  public arrMentors: string[] = [];

  public sandboxRegistrationForm: FormGroup;
  public sandboxEditForm: FormGroup;

  ngOnInit(): void {
    this.sandboxes = this.candidateContextService.getSandbox()[0];
    this.languages = this.candidateContextService.getLanguages()[0];
    this.stackTechnologies = this.candidateContextService.getStackTechnologies()[0];

    this.listRecruiters = this.candidateContextService.getRecruiters()[0];
    this.listInterviewers = this.candidateContextService.getInterviewers()[0];
    this.listMentors = this.candidateContextService.getMentors()[0];

    this.sandboxRegistrationForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      maxCandidates: new FormControl(0, [Validators.required]),
      description: new FormControl('', [Validators.required]),
      createDate: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      startRegistration: new FormControl('', [Validators.required]),
      endRegistration: new FormControl('', [Validators.required]),
      status: new FormControl(0, [Validators.required]),
      stackTechnologyIds: new FormControl('', [Validators.required]),
      languageIds: new FormControl('', [Validators.required]),
      recruiterIds: new FormControl('', [Validators.required]),
      interviewersIds: new FormControl('', [Validators.required]),
      mentorIds: new FormControl('', [Validators.required]),
    });

    this.sandboxEditForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      maxCandidates: new FormControl(0, [Validators.required]),
      description: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      startRegistration: new FormControl('', [Validators.required]),
      endRegistration: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      stackTechnologyIds: new FormControl('', [Validators.required]),
      languageIds: new FormControl('', [Validators.required]),
      recruiterIds: new FormControl('', [Validators.required]),
      interviewersIds: new FormControl('', [Validators.required]),
      mentorIds: new FormControl('', [Validators.required]),
    });
  }
  // Make array of id's from array of objects
  doArrayOfID(
    value: 'stackTechnologies' | 'languages' | 'recruiters' | 'interviewers' | 'mentors',
  ): string[] {
    if (this.sandboxChosen[value]) {
      const _value = this.sandboxChosen[value];
      return _value && _value[0] !== null ? _value?.map((item: IdName | Employee) => item.id) : [];
    }
    return [];
  }

  inputChange(value: string): void {
    if (this.sandboxes.length) {
      const _sandboxChosen = this.sandboxes.find((item: Sandbox) => item.name === value);
      if (_sandboxChosen) {
        this.sandboxChosen = _sandboxChosen;
        this.arrTech = this.doArrayOfID('stackTechnologies');
        this.arrLang = this.doArrayOfID('languages');
        this.arrRecruiters = this.doArrayOfID('recruiters');
        this.arrMentors = this.doArrayOfID('mentors');
        this.arrInterviewers = this.doArrayOfID('interviewers');
      }
    }
  }

  comparer(o1: string, o2: string): boolean {
    return o1 && o2 ? o1 === o2 : o2 === o2;
  }

  submit(): void {
    const sandFormCtrls = this.sandboxRegistrationForm.controls;
    sandFormCtrls.createDate.setValue(new Date().toISOString());
    if (this.sandboxRegistrationForm.valid) {
      sandFormCtrls.startDate.setValue(sandFormCtrls.startDate.value.toISOString());
      sandFormCtrls.endDate.setValue(sandFormCtrls.endDate.value.toISOString());
      sandFormCtrls.startRegistration.setValue(sandFormCtrls.startRegistration.value.toISOString());
      sandFormCtrls.endRegistration.setValue(sandFormCtrls.endRegistration.value.toISOString());
      this.candidateContextService.postSandbox(this.sandboxRegistrationForm.value);
      this.sandboxRegistrationForm.reset();
      Object.keys(this.sandboxRegistrationForm.controls).forEach((key: string) => {
        this.sandboxRegistrationForm.controls[key].setErrors(null);
      });
    }
    this.sandboxes = this.candidateContextService.getSandbox()[0];
  }
  edit(): void {
    const sandFormCtrls = this.sandboxEditForm.controls;
    sandFormCtrls.id.setValue(this.sandboxChosen.id);
    if (this.sandboxEditForm.valid) {
      sandFormCtrls.startDate.setValue(
        new Date(Date.parse(sandFormCtrls.startDate.value)).toISOString(),
      );
      sandFormCtrls.endDate.setValue(
        new Date(Date.parse(sandFormCtrls.endDate.value)).toISOString(),
      );
      sandFormCtrls.startRegistration.setValue(
        new Date(Date.parse(sandFormCtrls.startRegistration.value)).toISOString(),
      );
      sandFormCtrls.endRegistration.setValue(
        new Date(Date.parse(sandFormCtrls.endRegistration.value)).toISOString(),
      );
      this.candidateContextService.putSandbox(this.sandboxEditForm.value);
      this.sandboxEditForm.reset();
    }
  }
}
