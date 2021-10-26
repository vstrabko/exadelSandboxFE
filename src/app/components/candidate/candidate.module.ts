import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { CandidateRecordComponent } from './candidate-record/candidate-record.component';

@NgModule({
  declarations: [CandidateListComponent, CandidateRecordComponent],
  imports: [CommonModule],
})
export class CandidateModule {}
