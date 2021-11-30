import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

import { CalendarEventModel } from '../models/calendarEvent.model';
import { ToastService } from './toast.service';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CalendarEventPost } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

import { EventInput } from '@fullcalendar/angular';

@Injectable({ providedIn: 'root' })
export class CalendarEventService extends ApiService<CalendarEventModel> {
  public INITIAL_EVENTS: EventInput[] = [];
  public dataEvents: CalendarEventModel[];
  public eventSubject: BehaviorSubject<EventInput[]>;

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private translateService: TranslateService,
  ) {
    super(http, CalendarEventModel, '');
    this.eventSubject = new BehaviorSubject<EventInput[]>(this.INITIAL_EVENTS);
  }

  getEvents(): Subscription {
    super.apiUrl = '/api/events';
    return this.get().subscribe((events: CalendarEventModel[]) => {
      this.pushEventsToCalendar(events);
    });
  }

  // postEvents(events: any): void {
  //     super.apiUrl = '/api/calendarevents';
  //   this.create(events).subscribe(res => console.log(res));
  // }
  postEvents(events: CalendarEventPost[]): void {
    events.forEach((ev: CalendarEventPost) => this.postEvent(ev));
  }

  postEvent(event: CalendarEventPost): Subscription {
    return this.http
      .post<any>(`${environment.API_URL}/api/events/free-time`, event)
      .subscribe((ev: CalendarEventModel) => console.log('post', ev));
  }

  pushEventsToCalendar(events: CalendarEventModel[]): void {
    if (events.length) {
      events.forEach((ev: CalendarEventModel) => {
        const evObj = {
          id: ev.id,
          title: 'Free time',
          start: ev.startTime + 'Z',
          end: ev.endTime + 'Z',
          backgroundColor: 'green',
        };
        this.INITIAL_EVENTS.push(evObj);
      });
    }
    this.eventSubject.next(this.INITIAL_EVENTS);
  }

  deleteEvent(eventId: string): Subscription {
    return this.http.delete<any>(`${environment.API_URL}/api/events/${eventId}`).subscribe();
  }
}
