import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeComponent } from './time.component';
import { InternationalizationModule } from 'src/app/internationalization/internationalization.module';
import { LocalizationService } from 'src/app/internationalization/localization.service';

@NgModule({
  imports: [CommonModule, InternationalizationModule],
  declarations: [TimeComponent],
  exports: [TimeComponent],
  providers: [LocalizationService],
})
export class TimeModule {}
