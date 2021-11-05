import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateTableComponent } from './candidate-table/candidate-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';

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
  ],
  exports: [CandidateTableComponent],
})
export class CandidateTableModule {}
