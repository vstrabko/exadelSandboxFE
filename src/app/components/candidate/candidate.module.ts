import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { CandidateRecordComponent } from './candidate-record/candidate-record.component';
import {MatCardModule} from '@angular/material/card'; 

@NgModule({
  declarations: [CandidateListComponent, CandidateRecordComponent],
  imports: [CommonModule, MatCardModule],
})
export class CandidateModule {}
