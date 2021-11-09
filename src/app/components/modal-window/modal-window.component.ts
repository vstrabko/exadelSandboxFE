import { Component, HostListener, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ModalWindowService } from './modal-window.service';

import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
})
export class ModalWindowComponent implements OnInit {
  constructor(
    private modalWindowService: ModalWindowService,
    private authService: AuthService
    ) {}

  public vision: boolean;
  public userName = '';


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
        this.authService.authSubject.subscribe((res: Partial<User>): void => {
          this.userName = !!res?.name ? res.name : '';
        });
        break;
      default:
        break;
    }
  }
}
