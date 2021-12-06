import { InterviewerService } from './../../services/interviewer.service';
import { Interviewer } from 'src/app/models/interviewer.model';
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Candidate } from 'src/app/models/candidate.model';
import { ModalWindowService } from '../modal-window/modal-window.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Interval } from 'src/app/interfaces/interfaces';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-appoint-interview-popup',
  templateUrl: './appoint-interview-popup.component.html',
  styleUrls: ['./appoint-interview-popup.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class AppointInterviewPopupComponent implements OnInit, OnDestroy {
  public title = 'Appoint interview';
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  selectedTime: Date | null;
  localDateString: string;
  intervals: Interval[] = [
    { value: '10.00 - 10.30' },
    { value: '10.30 - 11.00' },
    { value: '11.00 - 11.30' },
    { value: '11.30 - 12.00' },
  ];
  selectedInterviewer: string;
  interviewers: Interviewer[];
  constructor(
    private modalWindowService: ModalWindowService,
    private _formBuilder: FormBuilder,
    private interviwerService: InterviewerService,
    private translateService: TranslateService,
  ) {}

  public visibleForm: Subscription;
  public visible: boolean;

  ngOnInit(): void {
    this.title = this.translateService.instant('candidateList.appointInterview');
    this.visibleForm = this.modalWindowService.visible.subscribe((result: boolean) => {
      this.visible = result;
      this.cancel();
    });

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
    });
    setTimeout(() => {
      this.modalWindowService.modalWindow.next('appoint interview');
    }, 200);
    this.interviwerService.get().subscribe((data: any) => {
      this.interviewers = data;
    });
  }
  ngOnDestroy(): void {
    if (this.visibleForm) {
      this.visibleForm.unsubscribe();
    }
  }
  @Input() user: Candidate;
  @Output() appointInterview: EventEmitter<boolean> = new EventEmitter<boolean>();
  cancel(): void {
    this.appointInterview.emit();
  }

  addEvent(event: MatDatepickerInputEvent<Date>): void {
    this.localDateString = new Date(String(event.value)).toLocaleDateString();
  }
}
