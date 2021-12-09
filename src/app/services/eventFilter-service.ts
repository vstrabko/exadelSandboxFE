import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../models/event.model';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class EventServiceFilter extends ApiService<Event> {
  constructor(private http: HttpClient) {
    super(http, Event, '/api/events/filter');
  }
}
