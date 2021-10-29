import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateRequestComponent } from './candidate-request.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

import { CandidateModule } from '../candidate/candidate.module';

@NgModule({
  declarations: [CandidateRequestComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatPaginatorModule, CandidateModule],
})
export class CandidateRequestModule {}
