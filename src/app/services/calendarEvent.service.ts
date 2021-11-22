import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

import { CalendarEventModel } from '../models/calendarEvent.model';

@Injectable({ providedIn: 'root' })
export class CalendarEventService extends ApiService<CalendarEventModel> {
  constructor(private http: HttpClient) {
    super(http, CalendarEventModel, '/api/calendarevents');
  }
}
