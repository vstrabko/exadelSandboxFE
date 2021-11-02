import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateRequestComponent } from './candidate-request.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { InternationalizationModule } from 'src/app/internationalization/internationalization.module';
import { LocalizationService } from 'src/app/internationalization/localization.service';

import { CandidateModule } from '../candidate/candidate.module';

@NgModule({
  declarations: [CandidateRequestComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CandidateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatRadioModule,
    MatCheckboxModule, InternationalizationModule
  ],
  providers: [LocalizationService],
  exports: [CandidateRequestComponent]
})
export class CandidateRequestModule {}
