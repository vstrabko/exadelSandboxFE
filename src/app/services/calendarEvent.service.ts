import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

import { CalendarEventModel } from '../models/calendarEvent.model';
import { ToastService } from './toast.service';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Subscription } from 'rxjs';
import { CalendarEventPost } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

import { EventInput } from '@fullcalendar/angular';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class CalendarEventService extends ApiService<CalendarEventModel> {
  public INITIAL_EVENTS: EventInput[] = [];
  public dataEvents: CalendarEventModel[];
  public eventSubject: Subject<EventInput[]>;
  public googleSubject: Subject<any>;

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private translateService: TranslateService,
    private userService: UserService,
  ) {
    super(http, CalendarEventModel, '');
    this.eventSubject = new Subject<EventInput[]>();
    this.googleSubject = new Subject<boolean>();
  }

  getEvents(): Subscription {
    super.apiUrl = `/api/users/${this.userService.user.id}/events`;
    return this.get().subscribe((events: CalendarEventModel[]) => {
      this.pushEventsToCalendar(events);
    });
  }

  getEventsForAdmin(): Subscription {
    super.apiUrl = `/api/events`;
    return this.get().subscribe((events: CalendarEventModel[]) => {
      const arrEvent = events.filter((ev: CalendarEventModel) => ev.type === 1);
      this.pushEventsToCalendar(arrEvent);
    });
  }

  getGoogleEvent(): any {
    return this.http
      .get<any>(`${environment.API_URL}/api/events/google/${this.userService.user.id}`)
      .subscribe(() => this.googleSubject.next(true));
  }

  postEvents(events: CalendarEventPost[]): void {
    events.forEach((ev: CalendarEventPost) => {
      this.postEvent(ev);
    });
  }

  postEvent(event: CalendarEventPost): Subscription {
    return this.http.post<any>(`${environment.API_URL}/api/events/free-time`, event).subscribe(
      () =>
        this.toastService.showSuccess(
          this.translateService.instant('calendarTostrSucs.text'),
          this.translateService.instant('calendarTostrSucs.title'),
        ),
      () =>
        this.toastService.showError(
          this.translateService.instant('calendarTostrErr.text'),
          this.translateService.instant('calendarTostrErr.title'),
        ),
    );
  }

  pushEventsToCalendar(events: CalendarEventModel[]): void {
    this.INITIAL_EVENTS = [];
    if (events.length) {
      events.forEach((ev: CalendarEventModel) => {
        const evObj = {
          id: ev.id,
          title: ev.summary,
          start: ev.startTime + 'Z',
          end: ev.endTime + 'Z',
          backgroundColor: 'white',
          borderColor: 'white',
        };
        switch (ev.type) {
          case 0:
            evObj.backgroundColor = '#009300'; //dark green
            evObj.borderColor = '#009300';
            break;
          case 1:
            evObj.backgroundColor = '#1a9da8'; //light blue
            evObj.borderColor = '#1a9da8';
            break;
          case 2:
            evObj.backgroundColor = '#f9b615'; // yellow
            evObj.borderColor = '#f9b615';
            break;
        }

        this.INITIAL_EVENTS.push(evObj);
      });
    }
    this.eventSubject.next(this.INITIAL_EVENTS);
  }

  deleteEvent(eventId: string): Subscription {
    return this.http.delete<any>(`${environment.API_URL}/api/events/${eventId}`).subscribe();
  }
}
