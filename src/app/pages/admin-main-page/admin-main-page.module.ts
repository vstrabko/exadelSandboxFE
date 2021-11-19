import { AppointInterviewPopupModule } from './../../components/appoint-interview-popup/appoint-interview-popup.module';
import { AdminMainPageComponent } from './admin-main-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateTableModule } from 'src/app/components/candidate-table/candidate-table.module';
import { CandidateCardPopupModule } from 'src/app/components/candidate-card-popup/candidate-card-popup.module';
@NgModule({
  declarations: [AdminMainPageComponent],
  imports: [
    CommonModule,
    CandidateTableModule,
    CandidateCardPopupModule,
    AppointInterviewPopupModule,
  ],
  exports: [AdminMainPageComponent],
})
export class AdminMainPageModule {}
