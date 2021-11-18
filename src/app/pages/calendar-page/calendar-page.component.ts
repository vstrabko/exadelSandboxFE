import { Component } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { INITIAL_EVENTS, createEventId } from './event-utils';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss'],
})
export class CalendarPageComponent {
  public isVisible = false;
  public selectDate: string;

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    locale: 'en',
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS,
    weekNumberCalculation: 'ISO',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };
  currentEvents: EventApi[] = [];

  handleWeekendsToggle(): void {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg): void {
    this.openModal();
    this.selectDate = selectInfo.startStr;
    const title = 'free time';
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: false,
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg): void {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]): void {
    this.currentEvents = events;
  }

  getTime(time: any): void {
    console.log('getTimes: ', time);
  }

  openModal(): void {
    this.isVisible = true;
  }
  closeModal(): void {
    this.isVisible = false;
  }
}
