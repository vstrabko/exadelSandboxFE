import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

export type ComingTimeType = { startTime: string; endTime: string; id: number };
@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss'],
})
export class TimeComponent {
  @Output() delete = new EventEmitter<number>();
  @Output() times: any[];

  @Input() comingTime: ComingTimeType;

  removeObject(): void {
    this.delete.emit(this.comingTime.id);
  }
  returnId(): number {
    return this.comingTime.id;
  }
  sort(): void {
    console.log('sort');
    console.log(this.comingTime.id);
  }
}
