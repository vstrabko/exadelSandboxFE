import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { PopupChooseTheTimeModule } from '../../components/popup-choose-the-time/popup-choose-the-time.module';
import { PopupConfirmModule } from '../../components/popup-confirm/popup-confirm.module';
import { CalendarPageComponent } from './calendar-page.component';
import { InternationalizationModule } from 'src/app/internationalization/internationalization.module';
import { LocalizationService } from 'src/app/internationalization/localization.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [CalendarPageComponent],
  imports: [
    CommonModule,
    FullCalendarModule,
    PopupChooseTheTimeModule,
    PopupConfirmModule,
    InternationalizationModule,
    MatProgressSpinnerModule,
  ],
  exports: [CalendarPageComponent],
  providers: [LocalizationService],
})
export class CalendarPageModule {}
