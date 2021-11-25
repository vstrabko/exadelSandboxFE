import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Countries } from '../models/country.model';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class CountryService extends ApiService<Countries> {
  constructor(private http: HttpClient) {
    super(http, Countries, 'https://api.hh.ru/areas');
  }
}
