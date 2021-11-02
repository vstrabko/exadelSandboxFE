import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss'],
})
export class TimeComponent {
  @Input() id: number;
  @Output() delete = new EventEmitter<number>();

  removeObject(): void {
    this.delete.emit(this.id);
  }
}
