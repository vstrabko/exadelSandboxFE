import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { EventTime } from '../../../interfaces/interfaces'

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss'],
})
export class TimeComponent {
  @Output() delete = new EventEmitter<number>();
  @Output() sort = new EventEmitter<any>();
  @Input() comingTime: EventTime;

  removeObject(): void {
    this.delete.emit(this.comingTime.id);
  }
  returnId(): number {
    return this.comingTime.id;
  }
  sortChildren(): void {
    this.sort.emit();
  }
  onTimeChange(event: any, type: any): void {
    if (type === 'from') {
      this.comingTime.startTime = event.target.value;
    } else {
      this.comingTime.endTime = event.target.value;
    }
    this.sort.emit(this.comingTime);
  }
}
