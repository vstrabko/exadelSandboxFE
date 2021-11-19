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
    phone: '+',
    education: 'BSIUR',
    languages: ['RU'],
    techSkills: ['JS'],
    additionalSkills: [''],
    candidateSandboxes: [
      {
        id: '',
        name: 'string',
        createDate: '2021-11-16T10:37:00.861Z',
        startDate: '2021-11-16T10:37:00.861Z',
        endDate: '2021-11-16T10:37:00.861Z',
        projectRoles: ['string'],
        team: 'string',
        status: 'string',
        testResult: 'string',
        feedbacks: ['string'],
      },
    ],
  };

  public mentorName = this.userName.userName();
  public userRole = this.userName.userRole();

  constructor(
    private modalWindowService: ModalWindowService,
    private userName: AuthService
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
    // this.getUserInfo();
  }
  public title = 'Candidate card';
  public sliderValue: number;

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

  onChangeRange(rangeValue: any): any {
    this.sliderValue = rangeValue.value;
  }

  getCandidateInfo(): any {
    return axios
      .get(`http://64.227.114.210:9090/api/candidates/${this.user.id}`)
      .then((response: any) => {
        console.log('getC', response)
        this.CANDIDATES_INFO.surname = response.data.surname;
        this.CANDIDATES_INFO.email = response.data.email;
        this.CANDIDATES_INFO.location = response.data.location;
        this.CANDIDATES_INFO.phone = response.data.phone;
        this.CANDIDATES_INFO.skype = response.data.skype;
        this.CANDIDATES_INFO.additionalSkills.push(response.data.additionalSkills);
        this.CANDIDATES_INFO.surname = response.data.surname;
        this.CANDIDATES_INFO.surname = response.data.surname;
        this.CANDIDATES_INFO.surname = response.data.surname;


      })
      .catch((error: any) => console.log('getC', error));
  }



  // getUserInfo(): any {
  //   return axios
  //     .get(`http://64.227.114.210:9090/api/users/user-info`)
  //     .then((response: any) => console.log('getU', response.data))
  //     .catch((error: any) => console.log('getU', error));
  // }

  // putUserInfo(USER_INFO: any): any {
  //   console.log(USER_INFO.id);

  //   return axios
  //     .post(`http://64.227.114.210:9090/api/candidates${USER_INFO.id}`, USER_INFO)
  //     .then((response: any) => console.log('put', response))
  //     .catch((error: any) => console.log('put', error));
  // }
}
