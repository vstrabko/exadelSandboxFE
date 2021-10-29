import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateCardPopupComponent } from './candidate-card-popup/candidate-card-popup.component';
import { ModalWindowModule } from '../modal-window/modal-window.module';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';

@NgModule({
  declarations: [CandidateCardPopupComponent],
  imports: [
    CommonModule,
    ModalWindowModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatCardModule,
    MatInputModule,
    TextFieldModule,
  ],
  exports: [CandidateCardPopupComponent],
})
export class CandidateCardPopupModule {}
