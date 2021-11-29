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
  onTimeChange(event: Event, type: string): void {
    if (type === 'from') {
      this.comingTime.startTime = event.target ? (event.target as HTMLInputElement).value : '';
    } else {
      this.comingTime.endTime = event.target ? (event.target as HTMLInputElement).value : '';
    }
    this.sort.emit(this.comingTime);
  }
}
