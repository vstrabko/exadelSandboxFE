import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { Candidate } from 'src/app/models/candidate.model';
import { AuthService } from 'src/app/services/auth.service';
import { ModalWindowService } from '../../modal-window/modal-window.service';

interface Status {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-candidate-card-popup',
  templateUrl: './candidate-card-popup.component.html',
  styleUrls: ['./candidate-card-popup.component.scss'],
})
export class CandidateCardPopupComponent implements OnInit {
  private URL = 'http://64.227.114.210:9090/api/';

  public CANDIDATES_INFO = {
    id: '',
    name: '',
    surname: '',
    email: '',
    location: '',
    skype: '',
    phone: '',
    currentJob: null,
    professionaCertificates: '',
    additionalSkills: '',
    candidateLanguages: [
      {
        id: '',
        language: {
          id: '',
          name: '',
        },
        languageLevel: {
          orderLevel: 1,
          id: '',
          name: '',
        },
      },
    ],
    candidateTechSkills: [
      {
        id: '',
        skill: {
          id: '',
          name: '',
        },
      },
    ],
    candidateSandboxes: [
      {
        id: '',
        sandbox: {
          description: '',
          maxCandidates: 10,
          createDate: '',
          startDate: '',
          endDate: '',
          startRegistration: '',
          endRegistration: '',
          status: 0,
          id: '',
          name: '',
        },
        candidateProcesses: [
          {
            id: '',
            status: {
              id: '',
              name: '',
            },
            testResult: '',
            createDate: '',
            feedbacks: [null],
          },
        ],
        candidateProjectRole: {
          id: '',
          name: '',
        },
      },
    ],
  };

  public title = 'Candidate card';
  public sliderValue: number;
  public userAuthName = this.userName.userName();
  public userRole = this.userName.userRole();
  public userId = this.userName.userId();
  public userReview: string;
  public feedbacks: any[];
  public feedbackId: string;
  public candidateProccesId: string;
  public date = new Date();
  public dateFeedback: any[];
  public grade: number;
  public candidateStatus: string;

  constructor(
    private modalWindowService: ModalWindowService,
    private userName: AuthService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.modalWindowService.visible.subscribe((result: boolean) => {
      console.log(result);
      this.cancel();
    });

    setTimeout(() => {
      this.modalWindowService.modalWindow.next('candidates card');
    }, 200);

    this.getCandidateInfo();

    switch (this.userRole) {
      case 'Admin':
        this.grade = 100;
        break;
      case 'Mentor':
        this.grade = 10;
        break;
      case 'Interviewer':
        this.grade = 4;
        break;
      default:
        break;
    }
  }

  @Input() user: Candidate;
  @Output() modal: EventEmitter<boolean> = new EventEmitter<boolean>();

  status: Status[] = [
    { value: 'Test-task', viewValue: 'Test-task' },
    { value: 'interview', viewValue: 'interview' },
    { value: 'tech interview', viewValue: 'tech interview' },
    { value: 'rejecteted', viewValue: 'rejecteted' },
    { value: 'questionable', viewValue: 'questionable' },
    { value: 'approved', viewValue: 'approved' },
  ];

  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;

  cancel(): void {
    this.modal.emit();
  }

  printForm(): any {
    const FEEDBACK_PUT = {
      feedbackId: this.feedbackId,
      grade: this.sliderValue,
      userReview: this.userReview,
    };
    const FEEDBACK_POST = {
      userId: this.userId,
      grade: this.sliderValue,
      userReview: this.userReview,
      candidateProccesId: this.candidateProccesId,
    };
    console.log(FEEDBACK_POST);
    !this.feedbackId ? this.postFeedbacks(FEEDBACK_POST) : this.putFeedbacks(FEEDBACK_PUT);
    // this.getFeedbacks();
  }
  onChangeRange(rangeValue: MatSliderChange): void {
    this.sliderValue = rangeValue.value ? rangeValue.value : 0;
  }

  postFeedbacks(FEEDBACK_POST: {
    userId: string;
    grade: number;
    userReview: string;
    candidateProccesId: string;
  }): any {
    return axios
      .post(`${this.URL}feedbacks`, FEEDBACK_POST)
      .then((response: any) => console.log(response))
      .catch((error: any) => console.log(error));
  }

  getFeedbacks(): any {
    return axios
      .get(`${this.URL}feedbacks/${this.feedbackId}`)
      .then((response: any) => console.log(response))
      .catch((error: any) => console.log(error));
  }

  putFeedbacks(FEEDBACK_PUT: { feedbackId: string; grade: number; userReview: string }): any {
    return axios //add to URL
      .put(
        `${this.URL}${FEEDBACK_PUT.feedbackId}?userReview=${FEEDBACK_PUT.userReview}&grade=${FEEDBACK_PUT.grade}`,
        { params: FEEDBACK_PUT },
      )
      .then((response: any) => console.log(response))
      .catch((error: any) => console.log(error));
  }

  getCandidateInfo(): any {
    return axios
      .get(`${this.URL}candidates/${this.user.id}`)
      .then((response: any) => {
        console.log(response);
        this.CANDIDATES_INFO.id = response.data.id;
        this.CANDIDATES_INFO.surname = response.data.surname;
        this.CANDIDATES_INFO.email = response.data.email;
        this.CANDIDATES_INFO.location = response.data.location.name;
        this.CANDIDATES_INFO.phone = response.data.phone;
        this.CANDIDATES_INFO.skype = response.data.skype;
        this.CANDIDATES_INFO.additionalSkills = response.data.additionalSkills;
        const candidateTechSkills = response.data.candidateTechSkills;
        this.CANDIDATES_INFO.candidateTechSkills =
          candidateTechSkills[candidateTechSkills.length - 1].skill.name;
        const candidateLanguages = response.data.candidateLanguages;
        this.CANDIDATES_INFO.candidateLanguages =
          candidateLanguages[candidateLanguages.length - 1].language.name;
        const candidateSandboxes = response.data.candidateSandboxes;
        const candidateProcesses =
          candidateSandboxes[candidateSandboxes.length - 1].candidateProcesses;
        this.candidateProccesId = candidateProcesses[candidateProcesses.length - 1].status.id;
        this.candidateStatus = candidateProcesses[candidateProcesses.length - 1].status.name;
        this.feedbacks = candidateProcesses[candidateProcesses.length - 1].feedbacks;
        console.log(this.feedbacks);
        const createDate: string[] = [];
        this.feedbacks.forEach((element: any) => {
          element.userId === this.userId ? (this.userReview = element.userReview) : null;
          element.userId === this.userId ? (this.feedbackId = element.id) : null;
          // if (element.userId === this.userId) {
          //   if (element.grade) {
          //     this.grade = element.grade
          //   } else this.grade = 0;
          // }
          element.userId === this.userId ? (this.sliderValue = element.grade) : null;
          // console.log(this.userReview, this.feedbackId, element.grade);
          // if (!element.grade) {
          //   this.grade = 0;
          // }
        });
        this.dateFeedback = createDate;
        // this.feedbacks.forEach((element: any) => {
        //   element.userId === this.userId ? (this.feedbackId = element.id) : null;
        //   console.log(this.feedbackId);
        // });
      })
      .catch((error: any) => this.toastr.error(error));
  }
}
