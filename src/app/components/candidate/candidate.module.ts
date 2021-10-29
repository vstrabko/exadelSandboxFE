import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { CandidateRecordComponent } from './candidate-record/candidate-record.component';
import { CandidateCardPopupModule } from '../candidate-card-popup/candidate-card-popup.module';

import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [CandidateListComponent, CandidateRecordComponent],
  imports: [CommonModule, MatCardModule, MatCheckboxModule, CandidateCardPopupModule],
  exports: [CandidateListComponent],
})
export class CandidateModule {}
