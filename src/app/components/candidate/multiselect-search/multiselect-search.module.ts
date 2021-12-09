import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiselectSearchComponent } from './multiselect-search.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

import { LocalizationService } from 'src/app/internationalization/localization.service';
import { InternationalizationModule } from 'src/app/internationalization/internationalization.module';

@NgModule({
  declarations: [MultiselectSearchComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    InternationalizationModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
  exports: [MultiselectSearchComponent],
  providers: [LocalizationService],
})
export class MultiselectSearchModule {}
