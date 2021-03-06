import { MultiselectSearchModule } from './../candidate/multiselect-search/multiselect-search.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateTableComponent } from './candidate-table/candidate-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { LocalizationService } from 'src/app/internationalization/localization.service';
import { InternationalizationModule } from 'src/app/internationalization/internationalization.module';
// TODO: check do we need translation here
// import { MatPaginatorIntlRu } from '../candidate/candidate-list/intPaginator';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CandidateTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSortModule,
    MultiselectSearchModule,
    InternationalizationModule,
    MatExpansionModule,
    MatIconModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  exports: [CandidateTableComponent],
  providers: [LocalizationService],
})
export class CandidateTableModule {}
