/* eslint-disable @typescript-eslint/unbound-method */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { LagnugageLevelService } from 'src/app/services/lagnugage-level.service';
import { SkillsService } from 'src/app/services/skills.service';
import { languageLevel } from '../../models/languageLevels.model';
import { skills } from '../../models/skills.model';

@Component({
  selector: 'app-candidate-request',
  templateUrl: './candidate-request.component.html',
  styleUrls: ['./candidate-request.component.scss'],
})
export class CandidateRequestComponent implements OnInit {
  levelsValues: string[] = [];
  skills: string[] = [];

  constructor(
    private toastr: ToastrService,
    private translateService: TranslateService,
    private lagnugageLevelService: LagnugageLevelService,
    private skillsService: SkillsService,
  ) {
    this.translateService.onLangChange.subscribe(() => {
      this.translateLabels();
    });
    this.translateLabels();
  }
  title = '';
  text = '';
  registrationForm: FormGroup;

  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  ngOnInit(): void {
    this.lagnugageLevelService
      .get()
      .subscribe((data: languageLevel[]): void =>
        data.forEach((level: languageLevel): number => this.levelsValues.push(level.name)),
      );
    this.skillsService
      .get()
      .subscribe((data: skills[]): void => data.forEach((skill: skills): number => this.skills.push(skill.name)));

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
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      this.toastr.success(this.title, this.text);
      this.registrationForm.reset();
    }
  }
  translateLabels(): void {
    this.title = this.translateService.instant('tostr.title');
    this.text = this.translateService.instant('tostr.text');
  }
}
