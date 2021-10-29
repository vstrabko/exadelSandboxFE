import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './error-page.component';
import { InternationalizationModule } from 'src/app/internationalization/internationalization.module';
import { LocalizationService } from 'src/app/internationalization/localization.service';

@NgModule({
  declarations: [ErrorPageComponent],
  imports: [CommonModule, InternationalizationModule],
  exports: [ErrorPageComponent],
  providers: [LocalizationService],
})
export class ErrorPageModule {}
