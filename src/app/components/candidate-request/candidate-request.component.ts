/* eslint-disable @typescript-eslint/unbound-method */
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { CandidateContext } from 'src/app/services/candidateContext.service';

@Component({
  selector: 'app-candidate-request',
  templateUrl: './candidate-request.component.html',
  styleUrls: ['./candidate-request.component.scss'],
})
export class CandidateRequestComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private translateService: TranslateService,
    private candidateContext: CandidateContext,
  ) {
    this.translateService.onLangChange.subscribe(() => {
      this.translateLabels();
    });
    this.translateLabels();
  }
  levelsValues: string[];
  skills: string[];

  @Input() sandboxValue: string;

  title = '';
  text = '';
  registrationForm: FormGroup;

  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  ngOnInit(): void {
    this.levelsValues = this.candidateContext.getEnglishLevels();
    this.skills = this.candidateContext.getSkills();

    this.registrationForm = new FormGroup({
      sandbox: new FormControl(),
      firstName: new FormControl('', [Validators.required]),
      secondName: new FormControl('', [Validators.required]),
      telephone: new FormControl(null, [Validators.required, Validators.pattern('[0-9]*')]),
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
