import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalWindowService {
  public visible = new Subject<any>();

  public modalWindow = new Subject<string>();

  constructor() {
    // this.visible.subscribe((val: boolean) => console.log(val));
  }

  // public openWindow(event: boolean): any {
  //   // this.visible.next(event);
  // }
}
