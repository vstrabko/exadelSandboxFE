import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

import { CalendarEventModel } from '../models/calendarEvent.model';
import { ToastService } from './toast.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { CalendarEvent } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CalendarEventService extends ApiService<CalendarEventModel> {
  constructor(private http: HttpClient,
              private toastService: ToastService,
              private translateService: TranslateService,) {
    super(http, CalendarEventModel, '');
  }
  // public dataEvents:

  getEvents(): Subscription {
    super.apiUrl = '/api/calendarevents';
    return this.get().subscribe((events: any) => {
      console.log('calendar', events)
    })
  }

  // postEvents(events: any): void {
  //     super.apiUrl = '/api/calendarevents';
  //   this.create(events).subscribe(res => console.log(res));
  // }
  postEvents(events: any): Subscription {
    return this.http
      .post<any>(`${environment.API_URL}/api/calendarevents`, events).subscribe(ev => console.log('post',ev))

  }
}
