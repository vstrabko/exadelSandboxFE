import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { EventTime } from '../../interfaces/interfaces';
import { ModalWindowService } from '../modal-window/modal-window.service';

@Component({
  selector: 'app-popup-choose-the-time',
  templateUrl: './popup-choose-the-time.component.html',
  styleUrls: ['./popup-choose-the-time.component.scss'],
})
export class PopupChooseTheTimeComponent implements OnInit {
  @Input() title: string = 'Choose the free time';
  @Input() selectDate: string;
  @Input() comingTime: EventTime[] = [];
  @Output() modal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() addTime: EventEmitter<EventTime[]> = new EventEmitter<EventTime[]>();

  public times: EventTime[] = [];

  constructor(private modalWindowService: ModalWindowService) {}

  ngOnInit(): void {
    this.times = this.comingTime.slice();
    this.sortTime();
    this.modalWindowService.visible.subscribe((result: boolean) => {
      console.log(result);
      this.cancel();
    });

    setTimeout(() => {
      this.modalWindowService.modalWindow.next('time');
    }, 200);
  }

  sortTime(updateTime: EventTime | undefined = undefined): void {
    if (updateTime) {
      this.times = this.times.map((value: EventTime) => {
        if (value.id === updateTime.id) {
          return updateTime;
        } else {
          return value;
        }
      });
    }

    this.times = this.times.sort((a: any, b: any) => {
      if (a.startTime < b.startTime) return -1;
      else if (a.startTime > b.startTime) return 1;
      else return 0;
    });
  }

  add(): void {
    const newId = this.times.length;
    const newTime:EventTime = {
      startTime: '00:00',
      endTime: '00:00',
      id: newId,
    };
    this.times.push(newTime);
    this.sortTime(newTime);
  }

  del(timeId: number): void {
    this.times = this.times.filter((time: EventTime) => {
      return time.id !== timeId;
    });
  }

  submit(): void {
    this.modal.emit(false);
    this.addTime.emit(this.times);
  }

  cancel(): void {
    this.modal.emit(false);
  }
}
