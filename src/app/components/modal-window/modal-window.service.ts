import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalWindowService {
  public visible = new Subject<boolean>();

  public modalSubject = new Subject<boolean>();

  constructor() {
    this.visible.subscribe((val: boolean) => this.openWindow(val) as boolean);
  }

  public openWindow(event: boolean): any {
    this.modalSubject.next(event);
  }
}
