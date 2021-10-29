import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { InternationalizationModule } from 'src/app/internationalization/internationalization.module';
import { LocalizationService } from 'src/app/internationalization/localization.service';

@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonModule, InternationalizationModule],
  exports: [HomePageComponent],
  providers: [LocalizationService],
})
export class HomePageModule {}
