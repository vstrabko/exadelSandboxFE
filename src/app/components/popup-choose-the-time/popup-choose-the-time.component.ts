import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ComingTimeType } from './time/time.component';
@Component({
  selector: 'app-popup-choose-the-time',
  templateUrl: './popup-choose-the-time.component.html',
  styleUrls: ['./popup-choose-the-time.component.scss'],
})
export class PopupChooseTheTimeComponent implements OnInit {
  @Output() modal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() title: string = 'Choose the time';
  @Input() titleData: string = '01/11/2021';

  @Input() comingTime: ComingTimeType[] = [];

  public times: ComingTimeType[] = [];

  ngOnInit(): void {
    this.times = this.comingTime.slice();
  }

  sortTime(): void {
    this.times = this.times.sort((a: any, b: any) => {
      if (a.startTime < b.startTime) return -1;
      else if (a.startTime > b.startTime) return 1;
      else return 0;
    });
  }

  add(): void {
    const newId = this.times.length;
    const newTime = {
      startTime: '00:00',
      endTime: '00:00',
      id: newId,
    };
    this.times.push(newTime);
    this.sortTime();
  }

  del(timeId: number): void {
    this.times = this.times.filter((time: ComingTimeType) => {
      return time.id !== timeId;
    });
    this.sortTime();
  }

  submit(): void {
    this.modal.emit(false);
  }

  cancel(): void {
    this.modal.emit(false);
  }
}
