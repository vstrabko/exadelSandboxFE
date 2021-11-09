import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Candidate } from 'src/app/models/candidate.model';

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
}
