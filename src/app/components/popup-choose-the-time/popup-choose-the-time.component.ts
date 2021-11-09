import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup-choose-the-time',
  templateUrl: './popup-choose-the-time.component.html',
  styleUrls: ['./popup-choose-the-time.component.scss'],
})
export class PopupChooseTheTimeComponent {
  @Output() modal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() title: string = 'Choose the time';
  @Input() titleData: string = '01/11/2021';

  public times: number[] = [0];

  add(): void {
    if (!this.times.length) {
      this.times.push(0);
      return;
    }

    const lastId = this.times[this.times.length - 1];

    this.times.push(lastId + 1);
  }

  del(timeId: number): void {
    this.times = this.times.filter((id: number) => {
      return id !== timeId;
    });
  }
  submit(): void {
    this.modal.emit(false);
  }

  cancel(): void {
    this.modal.emit(false);
  }
}
