/* eslint-disable @typescript-eslint/unbound-method */
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CandidateContextService } from 'src/app/services/candidate-context.service';
import { IdName } from 'src/app/models/id-name.model';
import { REGEXP } from '../../shared/constants/validators';

@Component({
  selector: 'app-candidate-request',
  templateUrl: './candidate-request.component.html',
  styleUrls: ['./candidate-request.component.scss'],
})
export class CandidateRequestComponent implements OnInit {
  constructor(private candidateContextService: CandidateContextService) {}

  levelsValues: IdName[];
  skills: IdName[];
  availability: IdName[];
  @Input() sandboxChosen: any = {};

  registrationForm: FormGroup;

  ngOnInit(): void {
    this.levelsValues = this.candidateContextService.getEnglishLevels();
    this.skills = this.candidateContextService.getSkills();
    this.availability = this.candidateContextService.getAvailability();

    this.registrationForm = new FormGroup({
      sandboxId: new FormControl(),
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      phone: new FormControl(null, [Validators.required, Validators.pattern('[+0-9]*')]),
      email: new FormControl('', [Validators.required, Validators.pattern(REGEXP.email)]),
      skype: new FormControl('', [Validators.required]),
      englishLevelId: new FormControl('', [Validators.required]),
      motivation: new FormControl('', [Validators.required]),
      availabillityTypeId: new FormControl('', [Validators.required]),
      sandboxPreferredLanguageId: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      primaryTechnologyId: new FormControl('', [Validators.required]),
      currentJob: new FormControl('', [Validators.required]),
      professionaCertificates: new FormControl(''),
      additionalSkills: new FormControl(''),
      timeContact: new FormControl('', [Validators.required]),
      isJoinToExadel: new FormControl(''),
      isAgreement: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid && this.sandboxChosen.name) {
      this.registrationForm.controls.sandboxId.setValue(this.sandboxChosen.id);
      this.candidateContextService.postCandidate(this.registrationForm.value);
      this.registrationForm.reset();
    }
  }
}
