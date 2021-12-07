import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
  EventInput,
  FullCalendarComponent,
  Calendar,
} from '@fullcalendar/angular';

import enLocale from '@fullcalendar/core/locales/es';
import ruLocale from '@fullcalendar/core/locales/fr';
import { CalendarEventService } from '../../services/calendarEvent.service';
import { CalendarEventPost } from '../../interfaces/interfaces';
import { UserService } from 'src/app/services/user.service';
import { LocalizationService } from 'src/app/internationalization/localization.service';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { ToastService } from '../../services/toast.service';

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
  public lang: string | null;
  public start: string;
  public end: string;
  public type: number;
  public calendar: Calendar;

  constructor(
    private calendarEventService: CalendarEventService,
    private userService: UserService,
    private localizationService: LocalizationService,
    private translateService: TranslateService,
    private toastService: ToastService,
  ) {}
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  ngOnInit(): void {
    this.calendarEventService.getEvents();
    this.calendarEventService.eventSubject.subscribe((res: EventInput[]) => {
      this.calendarOptions.events = res;
    });
    this.lang = localStorage.getItem('language');
    this.changeLang(`${this.lang ? this.lang : 'en'}`);
    this.translateService.onLangChange.subscribe((params: TranslationChangeEvent) => {
      this.changeLang(params.lang);
    });
  }

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today weekends',
      center: 'title',
      right: 'sync timeGridWeek,listWeek,dayGridMonth submit',
    },
    customButtons: {
      submit: {
        text: `Submit`,
        hint: 'Send events to server',
        click: () => this.submitEvents(),
      },
      weekends: {
        text: 'Weekends',
        hint: 'Toggle weekends',
        click: () => this.handleWeekendsToggle(),
      },
      sync: {
        text: 'sync',
        hint: 'Sync with Google',
        click: () => this.syncWithGoogle(),
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

  syncWithGoogle(): void {
    this.calendarEventService.getGoogleEvent();
    this.calendarEventService.googleSubject.subscribe(() => {
      this.calendarEventService.getEvents();
    });
    this.calendarEventService.eventSubject.subscribe((res: EventInput[]) => {
      this.calendarOptions.events = res;
    });
  }

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
    if (
      this.userService.user._roles.includes('Interviewer') &&
      clickInfo.event.backgroundColor === '#009300'
    ) {
      this.openModal();
      this.clickInfo = clickInfo;
    } else {
      this.toastService.showError(
        this.translateService.instant('calendarTostrDel.text'),
        this.translateService.instant('calendarTostrDel.title'),
      );
    }
  }

  handleEvents(events: EventApi[]): void {
    this.currentEvents = events;
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

  changeLang(lang: string): void {
    this.calendarOptions.locale = lang;
    const submit = this.calendarOptions.customButtons?.submit;
    const weekends = this.calendarOptions.customButtons?.weekends;
    const sync = this.calendarOptions.customButtons?.sync;
    this.calendarOptions.buttonText = {
      today: `${this.translateService.instant('calendarButtons.today') as string}`,
      month: `${this.translateService.instant('calendarButtons.month') as string}`,
      week: `${this.translateService.instant('calendarButtons.week') as string}`,
      list: `${this.translateService.instant('calendarButtons.list') as string}`,
    };
    if (submit && weekends && sync) {
      submit.text = `${this.translateService.instant('calendarButtons.subText') as string}`;
      submit.hint = `${this.translateService.instant('calendarButtons.subHint') as string}`;
      weekends.text = `${this.translateService.instant('calendarButtons.weekText') as string}`;
      weekends.hint = `${this.translateService.instant('calendarButtons.weekHint') as string}`;
      sync.text = `${this.translateService.instant('calendarButtons.syncText') as string}`;
      sync.hint = `${this.translateService.instant('calendarButtons.syncHint') as string}`;
    }
  }

  ngOnDestroy(): void {
    this.calendarEventService.eventSubject.next([]);
  }
}
