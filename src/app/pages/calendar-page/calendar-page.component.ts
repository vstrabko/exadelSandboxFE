import { Component, ViewChild, OnInit} from '@angular/core';
import { Calendar } from '@fullcalendar/core'
import { FullCalendarComponent, CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';

import { EventTime } from 'src/app/interfaces/interfaces';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import enLocale from '@fullcalendar/core/locales/es';
import ruLocale from '@fullcalendar/core/locales/fr';
import { CalendarEventService } from '../../services/calendarEvent.service';
import { CalendarEvent } from '../../interfaces/interfaces'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss'],
})
export class CalendarPageComponent implements OnInit{
  public isVisible = false;
  private calendarApi: any;
  public delEvent = false;
  public clickInfo: EventClickArg;
  public currentEvents: EventApi[] = [];
  public selectInfo: DateSelectArg;
  public arrEventsPost: CalendarEvent[] = [];

    constructor(private calendarEventService: CalendarEventService, private userService: UserService ) {
    const name = Calendar.name
  }

  ngOnInit(){
    this.calendarEventService.getEvents()
  }

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today weekends',
      center: 'title',
      right: 'timeGridWeek,listWeek,dayGridMonth submit'
    },
    customButtons: {
      submit: {
        text: 'Submit',
        hint: 'Send events to server',
        click: ()=> this.submitEvents(),
      },
      weekends: {
        text: 'Weekends',
        hint: 'Toggle weekends',
        click: ()=> this.handleWeekendsToggle(),
      }
    },

    locales: [ enLocale, ruLocale ],
    locale: 'en',
    initialView: 'timeGridWeek',
    initialEvents: INITIAL_EVENTS,
    weekNumberCalculation: 'ISO',
    weekends: true,
    editable: true,
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
    if(this.calendarApi.currentData.currentViewType === 'timeGridWeek' ){
    this.createEvent(selectInfo)
    this.calendarApi.unselect();

    }
  }

  handleEventClick(clickInfo: EventClickArg): void {
    this.openModal();
    this.clickInfo = clickInfo

    // if(this.calendarApi.currentData.currentViewType){
    //   this.openModal();
    // }

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


  createEvent(selectInfo:DateSelectArg): void{
      this.calendarApi.addEvent({
        // id: createEventId(),
        title: 'free time',
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: false,
        color: 'green'
      })


    this.creatObjEventForPost(selectInfo)
  }

  deleteEvent(){
    this.clickInfo.event.remove()
    console.log(this.currentEvents)
  }

  submitEvents(){
    console.log(this.arrEventsPost)
    this.calendarEventService.postEvents(this.arrEventsPost)
  }

  creatObjEventForPost(selectInfo: any){
    let startTime = selectInfo.start.toISOString();
    let endTime = selectInfo.end.toISOString();
    let objEvent = {
      startTime:startTime,
      endTime:endTime}
    console.log(objEvent)
    this.arrEventsPost.push(objEvent)
  }
}
