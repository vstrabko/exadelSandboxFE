import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { HomePageComponent } from './home-page.component';
import { InternationalizationModule } from 'src/app/internationalization/internationalization.module';
import { LocalizationService } from 'src/app/internationalization/localization.service';
import { CandidateRequestModule } from 'src/app/components/candidate-request/candidate-request.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    InternationalizationModule,
    CandidateRequestModule,
    MatSelectModule,
    MatCardModule,
  ],
  exports: [HomePageComponent],
  providers: [LocalizationService],
})
export class HomePageModule {}
