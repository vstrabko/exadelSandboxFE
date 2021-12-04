import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import axios, { AxiosResponse } from 'axios';
import { ToastrService } from 'ngx-toastr';
import { Candidate } from 'src/app/models/candidate.model';
import { AuthService } from 'src/app/services/auth.service';
import { ModalWindowService } from '../../modal-window/modal-window.service';
import { IdName } from 'src/app/models/id-name.model';

@Component({
  selector: 'app-candidate-card-popup',
  templateUrl: './candidate-card-popup.component.html',
  styleUrls: ['./candidate-card-popup.component.scss'],
})
export class CandidateCardPopupComponent implements OnInit, OnDestroy {
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
  public statuses: IdName[];
  public candidateSandbox: string;
  public currentJob: string;

  selectedValue: string;

  constructor(
    private modalWindowService: ModalWindowService,
    private userName: AuthService,
    private toastr: ToastrService,
  ) {}

  public visibleForm: any;
  public saveForm: any;
  public counter = 0;

  ngOnInit(): void {
    this.visibleForm = this.modalWindowService.visible.subscribe((result: boolean) => {
      console.log(result);
      this.cancel();
    });

    this.saveForm = this.modalWindowService.event.subscribe((result: string) => {
      this.printForm();
      console.log(result);
    });

    setTimeout(() => {
      this.modalWindowService.modalWindow.next('candidates card');
    }, 200);

    this.getCandidateInfo();
    this.getStatuses();

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

  ngOnDestroy(): void {
    if (this.visibleForm) {
      this.visibleForm.unsubscribe();
    }
    if (this.saveForm) {
      this.saveForm.unsubscribe();
    }
  }
  @Input() user: Candidate;
  @Output() modal: EventEmitter<boolean> = new EventEmitter<boolean>();

  public checked = false;

  cancel(): void {
    this.modal.emit();
  }

  addStatus(): void {
    if (this.checked) {
      this.candidateStatus = this.selectedValue;
      this.counter++;
      console.log(this.selectedValue);
      console.log('new status', this.candidateStatus);

      this.checked = false;
      console.log(this.checked);
    } else {
      this.counter--;
      this.checked = true;
      console.log(this.checked);
    }
  }

  changeStatus(): void {
    const STATUS = {
      id: this.CANDIDATES_INFO.id,
      candidateSandboxId: this.candidateSandbox,
      newStatusId: '',
    };
    console.log(this.statuses);
    this.statuses.filter((el: any) => {
      el.name === this.candidateStatus ? (STATUS.newStatusId = el.id) : null;
    });
    console.log(STATUS);

    this.putStatus(STATUS);
  }

  putStatus(STATUS: { id: string; candidateSandboxId: string; newStatusId: string }): any {
    return axios
      .put(
        `${this.URL}candidates/${STATUS.id}/candidatesandboxes/${STATUS.candidateSandboxId}?newStatusId=${STATUS.newStatusId}`,
      )
      .then((response: any) => console.log(response))
      .catch((error: any) => console.log(error));
  }

  printForm(): any {
    const FEEDBACK_PUT = {
      grade: this.sliderValue,
      userReview: this.userReview,
    };
    const FEEDBACK_POST = {
      userId: this.userId,
      grade: this.sliderValue,
      userReview: this.userReview,
      candidateProccesId: this.candidateProccesId,
    };
    !this.feedbackId ? console.log(FEEDBACK_POST) : console.log(FEEDBACK_PUT);
    !this.feedbackId ? this.postFeedbacks(FEEDBACK_POST) : this.putFeedbacks(FEEDBACK_PUT);
  }
  onChangeRange(rangeValue: MatSliderChange): void {
    this.sliderValue = rangeValue.value ? rangeValue.value : 0;
  }

  postFeedbacks(FEEDBACK_POST: {
    userId: any;
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

  getStatuses(): any {
    return axios
      .get(`${this.URL}statuses`)
      .then((response: AxiosResponse<any, any>): void => {
        setTimeout(() => {
          this.statuses = response.data;
        }, 1);
      })
      .catch((error: any) => console.log(error));
  }

  putFeedbacks(FEEDBACK_PUT: { grade: number; userReview: string }): any {
    return axios
      .put(`${this.URL}feedbacks/${this.feedbackId}`, FEEDBACK_PUT)
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
        this.CANDIDATES_INFO.professionaCertificates = response.data.professionaCertificates;
        const candidateTechSkills = response.data.candidateTechSkills;
        this.CANDIDATES_INFO.candidateTechSkills =
          candidateTechSkills[candidateTechSkills.length - 1].skill.name;
        const candidateLanguages = response.data.candidateLanguages;
        this.CANDIDATES_INFO.candidateLanguages =
          candidateLanguages[candidateLanguages.length - 1].language.name;
        const candidateSandboxes = response.data.candidateSandboxes;
        this.candidateSandbox = candidateSandboxes[candidateSandboxes.length - 1].id;
        this.currentJob = candidateSandboxes[candidateSandboxes.length - 1].currentJob;
        const candidateProcesses =
          candidateSandboxes[candidateSandboxes.length - 1].candidateProcesses;
        this.candidateProccesId = candidateProcesses[candidateProcesses.length - 1].id; //TODO
        console.log('log', this.candidateProccesId);
        this.candidateStatus = candidateProcesses[candidateProcesses.length - 1].status.name;
        this.feedbacks = candidateProcesses[candidateProcesses.length - 1].feedbacks;
        console.log(this.feedbacks);
        const createDate: string[] = [];
        this.feedbacks.forEach((element: any) => {
          element.userId === this.userId ? (this.userReview = element.userReview) : null;
          element.userId === this.userId ? (this.feedbackId = element.id) : null;
          element.userId === this.userId ? (this.sliderValue = element.grade) : null;
        });
        this.dateFeedback = createDate;
      })
      .catch((error: any) => console.log(error));
  }
}
