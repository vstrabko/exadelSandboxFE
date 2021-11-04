import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
})
export class ModalWindowComponent {
  @Input() title: string = '';

  @HostListener('window:keydown', ['$event'])
  closeESC(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case 27:
        console.log('esc');
        break;
      case 9:
        event.preventDefault();
        console.log('tab');
        break;
      case 13:
        console.log('enter');
        break;
      default:
        break;
    }
  }
}
