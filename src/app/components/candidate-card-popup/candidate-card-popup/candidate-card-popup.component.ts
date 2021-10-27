import { Component } from '@angular/core';

interface Status {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-candidate-card-popup',
  templateUrl: './candidate-card-popup.component.html',
  styleUrls: ['./candidate-card-popup.component.scss'],
})
export class CandidateCardPopupComponent {
  public title = 'Candidate card';
  public classFlag: boolean = false;
  status: Status[] = [
    { value: '1', viewValue: '1' },
    { value: '2', viewValue: '2' },
    { value: '3', viewValue: '3' },
  ];
}
