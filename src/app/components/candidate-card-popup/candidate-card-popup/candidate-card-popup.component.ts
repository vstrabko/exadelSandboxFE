import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import axios from 'axios';
import { Candidate } from 'src/app/models/candidate.model';
import { ModalWindowService } from '../../modal-window/modal-window.service';
import { TranslateService } from '@ngx-translate/core';

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
    name: 'Mikhail Hasilau',
    role: 'admin',
  };

  public CANDIDATES_INFO = {
    id: '1',
    name: 'name',
    surname: 'surname',
    email: 'email@gmail.com',
    location: 'Belarus',
    skype: 'skype',
    phone: '+123456789',
    education: 'BSIUR',
    languages: ['RU'],
    techSkills: ['JS'],
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

  constructor(
    private modalWindowService: ModalWindowService,
    private translateService: TranslateService,
  ) {}
  ngOnInit(): void {
    this.title = this.translateService.instant('candidate.title');
    this.modalWindowService.visible.subscribe((result: boolean) => {
      console.log(result);
      this.cancel();
    });

    setTimeout(() => {
      this.modalWindowService.modalWindow.next('candidates card');
    }, 200);

    this.getCandidateInfo();
    this.getUserInfo();
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

  onChangeRange(rangeValue: MatSliderChange): void {
    this.sliderValue = rangeValue.value ? rangeValue.value : 0;
  }

  getCandidateInfo(): any {
    return axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then((response: any) => console.log('getC', response))
      .catch((error: any) => console.log('getC', error));
  }

  getUserInfo(): any {
    return axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then((response: any) => console.log('getU', response.data))
      .catch((error: any) => console.log('getU', error));
  }

  // putUserInfo(USER_INFO: any): any {
  //   console.log(USER_INFO.id);

  //   return axios
  //     .post(`http://64.227.114.210:9090/api/candidates${USER_INFO.id}`, USER_INFO)
  //     .then((response: any) => console.log('put', response))
  //     .catch((error: any) => console.log('put', error));
  // }
}
