import { dateRange } from './../../interfaces/interfaces';
import { merge } from 'rxjs/internal/observable/merge';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Event } from './../../models/event.model';
import { InterviewerService } from './../../services/interviewer.service';
import { Interviewer } from 'src/app/models/interviewer.model';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Candidate } from 'src/app/models/candidate.model';
import { ModalWindowService } from '../modal-window/modal-window.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { EventServiceFilter } from 'src/app/services/eventFilter-service';
import { PostInterviewService } from 'src/app/services/interviewPost-service';
import { TranslateService } from '@ngx-translate/core';
import { MatSelectChange } from '@angular/material/select';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
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
export class AppointInterviewPopupComponent implements OnInit {
  public title = 'Appoint interview';
  noFreeInterviewers: boolean = false;
  freeInterviewersId: string[];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  selectedTime: dateRange;
  localDateString: string;
  intervals: dateRange[] = [];
  busyIntervals: dateRange[] = [];
  selectedInterviewer: Interviewer | null = null;
  interviewers: Interviewer[] = [];
  ownerId: string = '';
  recruiter: User;
  options = {
    params: {
      start: '',
      end: '',
      type: 0,
    },
  };
  optionsBusy = {
    params: {
      id: '',
      start: '',
      end: '',
      type: 1,
    },
  };

  constructor(
    private modalWindowService: ModalWindowService,
    private _formBuilder: FormBuilder,
    private interviwerService: InterviewerService,
    private eventServiceFilter: EventServiceFilter,
    private postInterviewService: PostInterviewService,
    private translateService: TranslateService,
    private userService: UserService,
    private toastService: ToastService,
    private http: HttpClient,
  ) {}

  public visibleForm: Subscription;
  public visible: boolean;

  ngOnInit(): void {
    this.recruiter = this.userService.user;
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

  getDateIntervals(start: Date, end: Date, maxMin: number): dateRange[] {
    const result = [];
    const utcEnd = new Date(
      Date.UTC(end.getFullYear(), end.getMonth(), end.getDate(), end.getHours(), end.getMinutes()),
    );
    const s = new Date(
      Date.UTC(
        start.getFullYear(),
        start.getMonth(),
        start.getDate(),
        start.getHours(),
        start.getMinutes(),
      ),
    );
    while (s < utcEnd) {
      const e = new Date(
        s.getFullYear(),
        s.getMonth(),
        s.getDate(),
        s.getHours(),
        s.getMinutes() + maxMin,
      );
      result.push({ start: new Date(s), end: e < utcEnd ? e : new Date(utcEnd) });
      s.setMinutes(s.getMinutes() + maxMin);
    }
    return result;
  }

  pickDate(date: string): void {
    this.localDateString = new Date(String(date)).toLocaleDateString();
    const startDate = new Date(String(date));
    const endDate = new Date(new Date(String(date)).setDate(startDate.getDate() + 1));
    this.options.params.start = this.queryFormat(startDate);
    this.options.params.end = this.queryFormat(endDate);
    this.options.params.type = 0;
    this.optionsBusy.params.start = this.queryFormat(startDate);
    this.optionsBusy.params.end = this.queryFormat(endDate);
  }

  addEvent(event: MatDatepickerInputEvent<Date>): void {
    this.interviewers = [];
    this.pickDate(String(event.value));
    this.eventServiceFilter.filter(this.options).subscribe((data: Event[]) => {
      if (data.length === 0) this.noFreeInterviewers = true;
      else this.noFreeInterviewers = false;
      data.map((ev: Event) => {
        this.interviwerService.getById(ev.ownerId).subscribe((data: Interviewer) => {
          if (this.interviewers.length === 0) this.interviewers.push(data);
          for (const i of this.interviewers) {
            if (data.id !== i.id) this.interviewers.push(data);
          }
        });
      });
    });
  }

  getAllTimes(): void {
    const freeTimes = this.eventServiceFilter.filter(this.options);
    console.log('freetimes', freeTimes);
    const idToUse = this.selectedInterviewer?.id || '';
    this.optionsBusy.params.id = idToUse;
    merge(
      freeTimes.pipe(
        mergeMap((evs: Event[]) => evs),
        filter((ev: Event) => {
          return ev.ownerId === `${idToUse}`;
        }),
        map((ev: Event) => {
          const freeTimeStart = new Date(ev.startTime);
          const freeTimeEnd = new Date(ev.endTime);
          this.intervals.push(...this.getDateIntervals(freeTimeStart, freeTimeEnd, 30));
          console.log('pipe', this.intervals);
        }),
      ),
      this.http
        .get(`${environment.API_URL}/api/users/${idToUse}/events/filter`, this.optionsBusy)
        .pipe(
          tap((x: any) => console.log(x)),
          mergeMap((evs: Event[]) => evs),
          filter((ev: Event) => ev.ownerId === String(this.recruiter.id)),
          map((ev: Event) => {
            console.log('map busy', ev);
            const freeTimeStart = new Date(ev.startTime);
            const freeTimeEnd = new Date(ev.endTime);
            this.busyIntervals.push(...this.getDateIntervals(freeTimeStart, freeTimeEnd, 30));
          }),
        ),
    ).subscribe({
      complete: (): void => {
        console.log(this.intervals);
        console.log(this.busyIntervals);
        this.intervals = this.intervals.filter((int: dateRange) => {
          console.log('\n', int.start);
          return !this.busyIntervals.some((bInt: dateRange) => {
            console.log('busy start', bInt.start, bInt.start === int.start);
            return bInt.start.toISOString() === int.start.toISOString();
          });
        });
        console.log('after', this.intervals);
      },
    });
  }

  getFreeTimes(event: MatSelectChange): void {
    console.log('step three');
    this.selectedInterviewer = event.value;
    this.intervals = [];
    this.busyIntervals = [];
    this.getAllTimes();
  }

  postInterview(): void {
    const InterviewObject = {
      ownerId: this.recruiter.id,
      summary: `tech interview for ${this.selectedCandidate.name} ${this.selectedCandidate.surname}`,
      description: 'string',
      startTime: this.selectedTime.start.toISOString(),
      endTime: this.selectedTime.end.toISOString(),
      candidateSandboxId: this.selectedCandidate.candidateSandboxes[0].id,
      members: [
        {
          name: this.selectedCandidate.name || '',
          email: this.selectedCandidate.email || '',
        },
        {
          name: this.selectedInterviewer?.name || '',
          email: this.selectedInterviewer?.email || '',
        },
      ],
    };
    this.postInterviewService.create(InterviewObject).subscribe(
      () => this.toastService.showSuccess('Appoint tech-interview', 'appointed!'),
      () => this.toastService.showError('Appoint tech-interview', 'appointment failed!'),
    );
  }
}
