import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { PopupChooseTheTimeModule } from '../../components/popup-choose-the-time/popup-choose-the-time.module';

import { CalendarPageComponent } from './calendar-page.component';

@NgModule({
  declarations: [CalendarPageComponent],
  imports: [CommonModule, FullCalendarModule, PopupChooseTheTimeModule],
  exports: [CalendarPageComponent],
})
export class CalendarPageModule {}
