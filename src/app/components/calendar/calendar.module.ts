import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [CalendarComponent],
  imports: [CommonModule, MatDatepickerModule, MatCardModule],
  exports: [CalendarComponent],
})
export class CalendarModule {}
