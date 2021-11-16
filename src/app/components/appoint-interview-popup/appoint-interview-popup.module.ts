import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointInterviewPopupComponent } from './appoint-interview-popup.component';
import { ModalWindowModule } from '../modal-window/modal-window.module';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppointInterviewPopupComponent],
  imports: [
    CommonModule,
    ModalWindowModule,
    MatSelectModule,
    MatStepperModule,
    MatButtonToggleModule,
    MatCardModule,
    MatInputModule,
    TextFieldModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [AppointInterviewPopupComponent],
})
export class AppointInterviewPopupModule {}
