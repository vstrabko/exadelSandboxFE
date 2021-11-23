import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import axios from 'axios';
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
  public USERS_INFO = {
    role: 'mentor',
  };

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
  public feedbacks: [];

  constructor(private modalWindowService: ModalWindowService, private userName: AuthService) {}

  ngOnInit(): void {
    this.modalWindowService.visible.subscribe((result: boolean) => {
      console.log(result);
      this.cancel();
    });

    setTimeout(() => {
      this.modalWindowService.modalWindow.next('candidates card');
    }, 200);

    this.getCandidateInfo();
    console.log(this.CANDIDATES_INFO.id);
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

  cancel(): void {
    this.modal.emit();
  }

  printForm(): any {
    console.log(this.userReview);
    const FEEDBACK = {
      id: this.CANDIDATES_INFO.id,
      userId: this.CANDIDATES_INFO.id,
      ratingId: this.CANDIDATES_INFO.id,
      createDate: '',
      userReview: '',
      candidateProccesId: this.CANDIDATES_INFO.id,
    };
    this.postFeedbacks(FEEDBACK);
  }

  postFeedbacks(FEEDBACK: any): any {
    return axios
      .post(`http://64.227.114.210:9090/api/feedbacks`, FEEDBACK)
      .then((response: any) => console.log('y', response))
      .catch((error: any) => console.log('n', error));
  }

  onChangeRange(rangeValue: any): any {
    this.sliderValue = rangeValue.value;
  }

  getCandidateInfo(): any {
    return axios
      .get(`http://64.227.114.210:9090/api/candidates/${this.user.id}`)
      .then((response: any) => {
        console.log('getC', response);
        this.CANDIDATES_INFO.id = response.data.id;
        this.CANDIDATES_INFO.surname = response.data.surname;
        this.CANDIDATES_INFO.email = response.data.email;
        this.CANDIDATES_INFO.location = response.data.location.name;
        this.CANDIDATES_INFO.phone = response.data.phone;
        this.CANDIDATES_INFO.skype = response.data.skype;
        this.CANDIDATES_INFO.additionalSkills = response.data.additionalSkills;
        this.CANDIDATES_INFO.candidateTechSkills = response.data.candidateTechSkills[0].skill.name; // TODO all skills
        this.CANDIDATES_INFO.candidateLanguages = response.data.candidateLanguages[0].language.name; // TODO all languages
        const temp = response.data.candidateSandboxes;
        const temp2 = temp[temp.length - 1].candidateProcesses;
        const temp3 = this.feedbacks = temp2[temp2.length - 1].feedbacks;
        console.log(temp3);
        temp3.forEach((element: any) => {
          element.userId === this.userId ? (this.userReview = element.userReview) : null;
        });
        console.log(this.userId);
        console.log(this.feedbacks);
      })
      .catch((error: any) => console.log('getC', error));
  }
}
