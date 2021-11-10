import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { ModalWindowService } from './modal-window.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
})
export class ModalWindowComponent implements OnInit, OnDestroy {
  constructor(private modalWindowService: ModalWindowService, private authService: AuthService) {}

  private vision: any;
  public whatIsTheForm: any;
  public userName = '';

  public ngOnInit(): void {
    // this.vision = this.modalWindowService.visible.subscribe((value: boolean) => console.log(value));
    // this.modalWindowService.modalWindow.subscribe((value: string) => {
    //   console.log('before', this.whatIsTheForm);
    //   // this.changeName(value)

    // });
    this.changeName();
    // this.modalWindowService.modalWindow.subscribe((value: string) => console.log(this, value));
  }
  ngOnDestroy(): void {
    if (this.vision) {
      this.vision.unsubscribe();
    }
  }

  @Input() title: string = '';

  changeName(): void {
    this.vision = this.modalWindowService.modalWindow.subscribe((value: string) => {
      console.log('before', this.whatIsTheForm);
      this.whatIsTheForm = value;
      console.log('after', this.whatIsTheForm);
    });
  }

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
        event.preventDefault();

        console.log('enter');
        console.log(this.whatIsTheForm);

        if (this.whatIsTheForm === 'login') {
          this.authService.authSubject.subscribe((res: Partial<User>): void => {
            this.userName = !!res?.name ? res.name : '';
          });
          console.log(this.whatIsTheForm);
        } else if (this.whatIsTheForm === 'candidates card') {
          console.log('candidates card');
        }

        // switch (this.whatIsTheForm) {
        //   case 'login':
        //     this.authService.authSubject.subscribe((res: Partial<User>): void => {
        //       this.userName = !!res?.name ? res.name : '';
        //     });
        //     break;
        //   case 'candidates card':
        //     console.log('candidates card');

        //     break;
        //   case 'time':

        //     break;
        //   case 'english':

        //     break;

        //   default:
        //     break;
        // }

        break;
      default:
        break;
    }
  }
}
