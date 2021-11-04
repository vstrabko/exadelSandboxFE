import { Component, HostListener, Input } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
})
export class ModalWindowComponent {
  constructor(
    private login: LoginFormComponent
    ) {}

  @Input() title: string = '';

  @HostListener('window:keydown', ['$event'])
  closeESC(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case 27:
        this.login.cancel();
        break;
      case 9:
        event.preventDefault();
        break;
      case 13:
        this.login.submit();
        break;
      default:
        break;
    }
  }
}
