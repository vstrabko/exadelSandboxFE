import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalWindowService {
  public visible = new Subject<boolean>();
  public modalWindow = new Subject<string>();

}
