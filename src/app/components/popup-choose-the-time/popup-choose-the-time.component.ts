import {
  Component,
  ComponentFactoryResolver,
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
  @Input() titleData: string = '01/11/2021';

  public times: any = [0];

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  input = TimeComponent;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
  // eslint-disable-next-line
  add() {
    if (!this.times.length) {
      this.times.push(0);
      return;
    }
    // eslint-disable-next-line
    const lastId = this.times[this.times.length - 1];
    // eslint-disable-next-line
    this.times.push(lastId + 1);
  }
  // eslint-disable-next-line
  del(timeId: number) {
    this.times = this.times.filter((id: number) => {
      return id !== timeId;
    });
  }
}
