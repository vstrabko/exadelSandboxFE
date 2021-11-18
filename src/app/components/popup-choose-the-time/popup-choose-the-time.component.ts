import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ComingTimeType } from './time/time.component';
import { ModalWindowService } from '../modal-window/modal-window.service';

@Component({
  selector: 'app-popup-choose-the-time',
  templateUrl: './popup-choose-the-time.component.html',
  styleUrls: ['./popup-choose-the-time.component.scss'],
})
export class PopupChooseTheTimeComponent implements OnInit {
  @Input() title: string = 'Choose the time';
  @Input() titleData: string = '01/11/2021';
  @Input() comingTime: ComingTimeType[] = [];
  @Output() modal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() addTime: EventEmitter<ComingTimeType[]> = new EventEmitter<ComingTimeType[]>();

  public times: ComingTimeType[] = [];

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

  sortTime(updateTime: ComingTimeType | undefined = undefined): void {
    if (updateTime) {
      this.times = this.times.map((value: ComingTimeType) => {
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
    const newTime = {
      startTime: '00:00',
      endTime: '00:00',
      id: newId,
    };
    this.times.push(newTime);
    this.sortTime(newTime);
  }

  del(timeId: number): void {
    this.times = this.times.filter((time: ComingTimeType) => {
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
