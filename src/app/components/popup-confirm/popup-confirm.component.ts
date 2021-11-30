import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-popup-confirm',
  templateUrl: './popup-confirm.component.html',
  styleUrls: ['./popup-confirm.component.scss'],
})
export class PopupConfirmComponent {
  @Output() modal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() deleteEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  public title = 'Delete event';

  submit(): void {
    this.deleteEvent.emit();
    this.modal.emit(false);
  }

  cancel(): void {
    this.modal.emit(false);
  }
}
