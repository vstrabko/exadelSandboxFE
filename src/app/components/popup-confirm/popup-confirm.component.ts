import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-popup-confirm',
  templateUrl: './popup-confirm.component.html',
  styleUrls: ['./popup-confirm.component.scss'],
})
export class PopupConfirmComponent implements OnInit {
  @Output() modal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() deleteEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  public title = 'Delete event';
  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.title = this.translateService.instant('confirmPopup.title');
  }

  submit(): void {
    this.deleteEvent.emit();
    this.modal.emit(false);
  }

  cancel(): void {
    this.modal.emit(false);
  }
}
