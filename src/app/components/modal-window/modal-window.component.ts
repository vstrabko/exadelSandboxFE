import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ModalWindowService } from './modal-window.service';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
})
export class ModalWindowComponent implements OnInit {
  constructor(private modalWindowService: ModalWindowService) {}

  public vision: boolean;

  public ngOnInit(): void {
    this.modalWindowService.visible.subscribe((value: boolean) => console.log(value));

    // const closeModal = this.modalWindowService.visible.subscribe( value => console.log(value));
  }

  @Input() title: string = '';

  @HostListener('window:keydown', ['$event'])
  hotKeys(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case 27:
        console.log('esc');
        this.modalWindowService.visible.next(false);
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
