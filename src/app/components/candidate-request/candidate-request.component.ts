/* eslint-disable @typescript-eslint/unbound-method */
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { CandidateContextService } from 'src/app/services/candidate-context.service';
import { IdName } from 'src/app/models/id-name.model';
import { Sandbox } from 'src/app/models/sandbox.model';

@Component({
  selector: 'app-candidate-request',
  templateUrl: './candidate-request.component.html',
  styleUrls: ['./candidate-request.component.scss'],
})
export class CandidateRequestComponent implements OnInit, OnChanges {
  constructor(
    private toastr: ToastrService,
    private translateService: TranslateService,
    private candidateContextService: CandidateContextService,
  ) {
    this.translateService.onLangChange.subscribe(() => {
      this.translateLabels();
    });
    this.translateLabels();
  }

  levelsValues: IdName[];
  skills: IdName[];
  availability: IdName[];
  sandboxes: Sandbox[] = [];
  sandbox: any = [];

  @Input() sandboxValue: string;

  title = '';
  text = '';
  registrationForm: FormGroup;

  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.sandboxes.length) {
      let cur: any;
      for (const propName in changes) {
        cur = changes[propName].currentValue;
      }
      this.sandbox = this.sandboxes.find((item: Sandbox): boolean => item.name === cur);
    }
  }

  ngOnInit(): void {
    this.levelsValues = this.candidateContextService.getEnglishLevels();
    this.skills = this.candidateContextService.getSkills();
    this.availability = this.candidateContextService.getAvailability();
    this.sandboxes = this.candidateContextService.getSandbox();

    this.registrationForm = new FormGroup({
      sandbox: new FormControl(),
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      phone: new FormControl(null, [Validators.required, Validators.pattern('[0-9]*')]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailRegex)]),
      skype: new FormControl('', [Validators.required]),
      englishLevel: new FormControl('', [Validators.required]),
      motivation: new FormControl('', [Validators.required]),
      availability: new FormControl('', [Validators.required]),
      language: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      skills: new FormControl('', [Validators.required]),
      job: new FormControl('', [Validators.required]),
      certificates: new FormControl(''),
      addSkills: new FormControl(''),
      timeContact: new FormControl('', [Validators.required]),
      joinExadel: new FormControl(''),
      agreement: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid && this.sandboxValue) {
      this.registrationForm.controls.sandbox.setValue(this.sandboxValue);
      console.log(this.registrationForm.value);
      this.toastr.success(this.title, this.text);

      /* this.registrationForm.reset(); */
    }
  }
  translateLabels(): void {
    this.title = this.translateService.instant('tostr.title');
    this.text = this.translateService.instant('tostr.text');
  }
}
