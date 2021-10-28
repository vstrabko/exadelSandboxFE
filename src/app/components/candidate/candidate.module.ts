import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { CandidateRecordComponent } from './candidate-record/candidate-record.component';
import { CandidateCardPopupModule } from '../candidate-card-popup/candidate-card-popup.module';

import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MultiselectSearchComponent } from './multiselect-search/multiselect-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [CandidateListComponent, CandidateRecordComponent, MultiselectSearchComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    CandidateCardPopupModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [CandidateListComponent, CandidateRecordComponent],
})
export class CandidateModule {}
