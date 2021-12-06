import { Event } from './../../models/event.model';
import { InterviewerService } from './../../services/interviewer.service';
import { Interviewer } from 'src/app/models/interviewer.model';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Candidate } from 'src/app/models/candidate.model';
import { ModalWindowService } from '../modal-window/modal-window.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { dateRange } from 'src/app/interfaces/interfaces';
import { EventServiceFilter } from 'src/app/services/eventFilter-service';
import { PostInterviewService } from 'src/app/services/interviewPost-service';

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
export class AppointInterviewPopupComponent implements OnInit {
  options = {
    params: {
      start: '',
      end: '',
      type: 0,
    },
  };
  noFreeInterviewers: boolean = false;
  freeInterviewersId: string[];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  selectedTime: dateRange;
  localDateString: string;
  intervals: dateRange[] = [];
  selectedInterviewer: string;
  interviewers: Interviewer[] = [];
  ownerId: string = '30b071d5-7ae9-4bb0-a857-d579243e61b4';
  constructor(
    private modalWindowService: ModalWindowService,
    private _formBuilder: FormBuilder,
    private interviwerService: InterviewerService,
    private eventServiceFilter: EventServiceFilter,
    private postInterviewService: PostInterviewService,
  ) {}
  ngOnInit(): void {
    console.log(this.selectedCandidate);
    this.modalWindowService.visible.subscribe((result: boolean) => {
      console.log(result);
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

    // setTimeout(() => {
    //   this.modalWindowService.modalWindow.next('candidates card');
    // }, 200);
  }

  @Input() selectedCandidate: Candidate;
  @Output() appointInterview: EventEmitter<boolean> = new EventEmitter<boolean>();

  cancel(): void {
    this.appointInterview.emit();
  }

  queryFormat(date: Date): string {
    const dateArr = date.toLocaleDateString().split('.');
    return `${dateArr[1]}-${dateArr[0]}-${dateArr[2]}`;
  }

  getDateIntervals(start: Date, end: Date, maxMin: number): void {
    const result = [];
    const s = new Date(start);
    while (s <= end) {
      const e = new Date(
        s.getFullYear(),
        s.getMonth(),
        s.getDate(),
        s.getHours(),
        s.getMinutes() + maxMin,
      );
      result.push({ start: new Date(s), end: e <= end ? e : new Date(end) });
      s.setMinutes(s.getMinutes() + maxMin);
    }
    this.intervals = result;
  }

  addEvent(event: MatDatepickerInputEvent<Date>): void {
    this.localDateString = new Date(String(event.value)).toLocaleDateString();
    const startDate = new Date(String(event.value));
    const endDate = new Date(new Date(String(event.value)).setDate(startDate.getDate() + 1));
    // const startArr = startDate.toLocaleDateString().split('.');
    // const endArr = endDate.toLocaleDateString().split('.');
    // this.options.params.start = `${startArr[1]}-${startArr[0]}-${startArr[2]}`;
    // this.options.params.end = `${endArr[1]}-${endArr[0]}-${endArr[2]}`;

    this.options.params.start = this.queryFormat(startDate);
    this.options.params.end = this.queryFormat(endDate);
    this.eventServiceFilter.filter(this.options).subscribe((data: Event[]) => {
      if (data.length === 0) {
        this.noFreeInterviewers = true;
      } else {
        this.noFreeInterviewers = false;
      }
      data.map((ev: Event) => {
        console.log('event', ev);

        const freeTimeStart = new Date(ev.startTime);
        const freeTimeEnd = new Date(ev.endTime);

        this.getDateIntervals(freeTimeStart, freeTimeEnd, 30);
        this.ownerId = ev.ownerId;
        this.interviwerService.getById(ev.ownerId).subscribe((data: any) => {
          this.interviewers.push(data);
          console.log('free interviewers', this.interviewers);
        });
      });
    });
  }

  getFreeTimes(): void {
    console.log('step two!');
  }

  postInterview(): void {
    console.log('create interview!');
    const InterviewObject = {
      ownerId: '875d48e4-b550-4a65-8733-238ca220594e',
      summary: 'string',
      description: 'string',
      startTime: '2021-12-02T19:08:52.670Z',
      endTime: '2021-12-02T19:08:52.670Z',
      candidateSandboxId: '30b071d5-7ae9-4bb0-a857-d579243e61b4',
      members: [
        {
          name: 'string',
          email: 'string',
        },
      ],
    };

    this.postInterviewService.create(InterviewObject).subscribe();
  }
}
