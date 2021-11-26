import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

import { CalendarEventModel } from '../models/calendarEvent.model';
import { ToastService } from './toast.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { CalendarEventPost } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

import { EventInput } from '@fullcalendar/angular';

@Injectable({ providedIn: 'root' })
export class CalendarEventService extends ApiService<CalendarEventModel> {
  public INITIAL_EVENTS: EventInput[] = []
  public dataEvents: CalendarEventModel[];

  constructor(private http: HttpClient,
              private toastService: ToastService,
              private translateService: TranslateService,) {
    super(http, CalendarEventModel, '');
  }


  getEvents(): Subscription {
    super.apiUrl = '/api/calendarevents';
    return this.get().subscribe((events: CalendarEventModel[]) => {
      this.dataEvents = events;
      this.pushEventsToCalendar()
      // console.log('calendar service', this.INITIAL_EVENTS)
    })
  }
  // postEvents(events: any): void {
  //     super.apiUrl = '/api/calendarevents';
  //   this.create(events).subscribe(res => console.log(res));
  // }
  postEvents(events: CalendarEventPost[]): Subscription {
    return this.http
      .post<any>(`${environment.API_URL}/api/calendarevents`, events).subscribe(ev => console.log('post',ev))
  }

  pushEventsToCalendar(){
    this.dataEvents.forEach( ev => {
      let evObj = {
        id: ev.id,
        title : 'Free time',
        // start : ev.startTime+'Z',
        // end : ev.endTime+'Z',
        start : ev.startTime,
        end : ev.endTime,
        backgroundColor : 'green'
      }
      this.INITIAL_EVENTS.push(evObj)
    })

  }



}
