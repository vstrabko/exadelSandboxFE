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

  inputChange(value: string): void {
    if (this.sandboxes.length) {
      const _sandboxChosen = this.sandboxes.find((item: Sandbox) => item.name === value);
      if (_sandboxChosen) {
        this.sandboxChosen = _sandboxChosen;
        this.arrTech =
          this.sandboxChosen.stackTechnologies && this.sandboxChosen.stackTechnologies[0] !== null
            ? this.sandboxChosen.stackTechnologies.map((tech: IdName) => tech.id)
            : [];
        this.arrLang =
          this.sandboxChosen.languages && this.sandboxChosen.languages[0] !== null
            ? this.sandboxChosen.languages.map((lang: IdName) => lang.id)
            : [];
        this.arrRecruiters =
          this.sandboxChosen.recruiters && this.sandboxChosen.recruiters[0] !== null
            ? this.sandboxChosen.recruiters.map((recr: IdName) => recr.id)
            : [];
        this.arrMentors =
          this.sandboxChosen.mentors && this.sandboxChosen.mentors[0] !== null
            ? this.sandboxChosen.mentors.map((men: IdName) => men.id)
            : [];
        this.arrInterviewers =
          this.sandboxChosen.interviewers && this.sandboxChosen.interviewers[0] !== null
            ? this.sandboxChosen.interviewers.map((int: IdName) => int.id)
            : [];
      }
    }
  }

  comparer(o1: string, o2: string): boolean {
    // if possible compare by object's name property - and not by reference.
    return o1 && o2 ? o1 === o2 : o2 === o2;
  }

  submit(): void {
    this.sandboxRegistrationForm.controls.createDate.setValue(new Date().toISOString());
    this.sandboxRegistrationForm.controls.startDate.setValue(
      this.sandboxRegistrationForm.controls.startDate.value.toISOString(),
    );
    this.sandboxRegistrationForm.controls.endDate.setValue(
      this.sandboxRegistrationForm.controls.endDate.value.toISOString(),
    );
    this.sandboxRegistrationForm.controls.startRegistration.setValue(
      this.sandboxRegistrationForm.controls.startRegistration.value.toISOString(),
    );
    this.sandboxRegistrationForm.controls.endRegistration.setValue(
      this.sandboxRegistrationForm.controls.endRegistration.value.toISOString(),
    );
    this.candidateContextService.postSandbox(this.sandboxRegistrationForm.value);
    if (this.sandboxRegistrationForm.valid) {
      /* this.sandboxRegistrationForm.reset(); */
    }
  }
  edit(): void {
    this.sandboxEditForm.controls.id.setValue(this.sandboxChosen.id);
    this.sandboxEditForm.controls.startDate.setValue(
      new Date(Date.parse(this.sandboxEditForm.controls.startDate.value)).toISOString(),
    );
    this.sandboxEditForm.controls.endDate.setValue(
      new Date(Date.parse(this.sandboxEditForm.controls.endDate.value)).toISOString(),
    );
    this.sandboxEditForm.controls.startRegistration.setValue(
      new Date(Date.parse(this.sandboxEditForm.controls.startRegistration.value)).toISOString(),
    );
    this.sandboxEditForm.controls.endRegistration.setValue(
      new Date(Date.parse(this.sandboxEditForm.controls.endRegistration.value)).toISOString(),
    );
    this.candidateContextService.putSandbox(this.sandboxEditForm.value);
    console.log(this.sandboxEditForm.value);

    if (this.sandboxEditForm.valid) {
      /* this.sandboxEditForm.reset(); */
    }
  }
}
