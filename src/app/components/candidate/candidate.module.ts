import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { CandidateRecordComponent } from './candidate-record/candidate-record.component';
import { CandidateCardPopupModule } from '../candidate-card-popup/candidate-card-popup.module';
import { LocalizationService } from 'src/app/internationalization/localization.service';
import { InternationalizationModule } from 'src/app/internationalization/internationalization.module';

import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MultiselectSearchComponent } from './multiselect-search/multiselect-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorIntlRu } from 'src/app/components/candidate/candidate-list/intPaginator';

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
    MatButtonModule,
    InternationalizationModule,
  ],
  exports: [CandidateListComponent, CandidateRecordComponent],
  providers: [LocalizationService, { provide: MatPaginatorIntl, useClass: MatPaginatorIntlRu }],
})
export class CandidateModule {}
