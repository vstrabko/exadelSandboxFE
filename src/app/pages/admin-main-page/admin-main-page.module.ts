import { CandidateModule } from './../../components/candidate/candidate.module';
import { AdminMainPageComponent } from './admin-main-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [AdminMainPageComponent],
  imports: [CommonModule, CandidateModule, MatPaginatorModule],
  exports: [AdminMainPageComponent],
})
export class AdminMainPageModule {}
