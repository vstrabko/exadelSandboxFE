import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Candidate } from 'src/app/models/candidate.model';
import { ModalWindowService } from '../../modal-window/modal-window.service';

@Component({
  selector: 'app-appoint-interview-popup',
  templateUrl: './appoint-interview-popup.component.html',
  styleUrls: ['./appoint-interview-popup.component.scss'],
})
export class AppointInterviewPopupComponent implements OnInit {
  constructor(private modalWindowService: ModalWindowService) {}
  ngOnInit(): void {
    this.modalWindowService.visible.subscribe((result: boolean) => {
      console.log(result);
      this.cancel();
    });

    setTimeout(() => {
      this.modalWindowService.modalWindow.next('candidates card');
    }, 200);
  }

  public title = 'Appoint Interview';
  @Input() user: Candidate;
  @Output() appointInterview: EventEmitter<boolean> = new EventEmitter<boolean>();

  cancel(): void {
    this.appointInterview.emit();
  }
}
