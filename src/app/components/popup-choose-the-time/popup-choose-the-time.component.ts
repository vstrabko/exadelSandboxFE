import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Input,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { TimeComponent } from './time/time.component';

@Component({
  selector: 'app-popup-choose-the-time',
  templateUrl: './popup-choose-the-time.component.html',
  styleUrls: ['./popup-choose-the-time.component.scss'],
})
export class PopupChooseTheTimeComponent {
  @Input() title: string = 'Choose the time';
  @Input() titleData: string = '';

  public times: any = [];

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  input = TimeComponent;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  add() {
    if (!this.times.length) {
      this.times.push(0);
      return;
    }

    const lastId = this.times[this.times.length - 1];
    this.times.push(lastId + 1);
  }

  del(timeId: number) {
    this.times = this.times.filter((id: number) => {
      return id != timeId;
    });
  }
}
