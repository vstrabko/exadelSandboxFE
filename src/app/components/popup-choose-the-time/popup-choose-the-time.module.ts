import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupChooseTheTimeComponent } from './popup-choose-the-time.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ModalWindowModule } from '../modal-window/modal-window.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [PopupChooseTheTimeComponent],
  imports: [
    CommonModule,
    ModalWindowModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  exports: [PopupChooseTheTimeComponent],
})
export class PopupChooseTheTimeModule {}
