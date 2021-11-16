import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Candidate } from 'src/app/models/candidate.model';
import { ModalWindowService } from '../modal-window/modal-window.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

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
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(private modalWindowService: ModalWindowService, private _formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.modalWindowService.visible.subscribe((result: boolean) => {
      console.log(result);
      this.cancel();
    });

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
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
