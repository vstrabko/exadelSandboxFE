import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSandboxPageComponent } from './create-sandbox-page.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { InternationalizationModule } from 'src/app/internationalization/internationalization.module';
import { LocalizationService } from 'src/app/internationalization/localization.service';
import { MultiselectSearchModule } from 'src/app/components/candidate/multiselect-search/multiselect-search.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [CreateSandboxPageComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    InternationalizationModule,
    MultiselectSearchModule,
    MatAutocompleteModule,
    MatTabsModule,
  ],
  exports: [CreateSandboxPageComponent],
  providers: [LocalizationService],
})
export class CreateSandboxPageModule {}
