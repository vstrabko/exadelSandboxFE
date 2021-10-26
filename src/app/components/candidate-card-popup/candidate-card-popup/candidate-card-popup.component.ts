import { Component, OnInit } from '@angular/core';

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
  constructor() {}

  public title = 'Candidate card';
  public classFlag: boolean = false;
  status: Status[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  ngOnInit(): void {}
}
