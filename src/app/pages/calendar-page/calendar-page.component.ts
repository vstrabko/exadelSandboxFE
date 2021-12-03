import { Component, OnInit, OnDestroy } from '@angular/core';

import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
  EventInput,
} from '@fullcalendar/angular';

import enLocale from '@fullcalendar/core/locales/es';
import ruLocale from '@fullcalendar/core/locales/fr';
import { CalendarEventService } from '../../services/calendarEvent.service';
import { CalendarEventPost } from '../../interfaces/interfaces';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss'],
})
export class CalendarPageComponent implements OnInit, OnDestroy {
  public isVisible = false;
  private calendarApi: any;
  public delEvent = false;
  public clickInfo: EventClickArg;
  public currentEvents: EventApi[] = [];
  public selectInfo: DateSelectArg;
  public arrEventsPost: CalendarEventPost[] = [];

  constructor(
    private calendarEventService: CalendarEventService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.calendarEventService.getEvents();
    this.calendarEventService.eventSubject.subscribe((res: EventInput[]) => {
      this.calendarOptions.events = res;
    });
  }

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today weekends',
      center: 'title',
      right: 'timeGridWeek,listWeek,dayGridMonth submit',
    },
    customButtons: {
      submit: {
        text: 'Submit',
        hint: 'Send events to server',
        click: () => this.submitEvents(),
      },
      weekends: {
        text: 'Weekends',
        hint: 'Toggle weekends',
        click: () => this.handleWeekendsToggle(),
      },
    },
    locales: [enLocale, ruLocale],
    locale: 'en',
    initialView: 'timeGridWeek',
    initialEvents: [],
    weekNumberCalculation: 'ISO',
    weekends: true,
    editable: false,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    allDaySlot: false,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };

  handleWeekendsToggle(): void {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg): void {
    this.calendarApi = selectInfo.view.calendar;
    if (
      this.calendarApi.currentData.currentViewType === 'timeGridWeek' &&
      this.userService.user._roles.includes('Interviewer')
    ) {
      this.createEvent(selectInfo);
      this.calendarApi.unselect();
    }
  }

  handleEventClick(clickInfo: EventClickArg): void {
    if (this.userService.user._roles.includes('Interviewer')) {
      this.openModal();
      this.clickInfo = clickInfo;
    }
  }

  handleEvents(events: EventApi[]): void {
    this.currentEvents = events;
    console.log('handleEvents', events);
  }

  openModal(): void {
    this.isVisible = true;
  }

  closeModal(): void {
    this.isVisible = false;
  }

  createEvent(selectInfo: DateSelectArg): void {
    this.calendarApi.addEvent({
      title: 'Free time',
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: false,
      color: '#009300',
    });
    this.creatObjEventForPost(selectInfo);
  }

  deleteEvent(): void {
    this.clickInfo.event.remove();
    console.log();
    if (this.clickInfo.event.id) {
      this.calendarEventService.deleteEvent(this.clickInfo.event.id);
    }
  }

  submitEvents(): void {
    this.calendarEventService.postEvents(this.arrEventsPost);
  }

  creatObjEventForPost(selectInfo: DateSelectArg): void {
    const startTime = selectInfo.start.toISOString();
    const endTime = selectInfo.end.toISOString();
    const objEvent = {
      ownerId: this.userService.user.id,
      summary: 'Free time',
      startTime: startTime,
      endTime: endTime,
    };
    this.arrEventsPost.push(objEvent);
  }

  ngOnDestroy(): void {
    this.calendarEventService.eventSubject.next([]);
  }
}
