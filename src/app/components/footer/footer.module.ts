import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { InternationalizationModule } from 'src/app/internationalization/internationalization.module';
import { LocalizationService } from 'src/app/internationalization/localization.service';

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, InternationalizationModule],
  exports: [FooterComponent],
  providers: [LocalizationService],
})
export class FooterModule {}
