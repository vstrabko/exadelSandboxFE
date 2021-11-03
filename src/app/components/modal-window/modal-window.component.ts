import { Component, HostListener, Input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
})
export class ModalWindowComponent {
  constructor(private closeModal: HeaderComponent) {}

  @Input() title: string = '';

  @HostListener('window:keydown', ['$event'])
  closeESC(event: any): any {
    if (event.keyCode === 27) {
      this.closeModal.closeModal();
    }
  }
}
