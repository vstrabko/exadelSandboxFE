import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalWindowService } from './modal-window.service';

//all console logs will be delete, when functions will be done
@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
})
export class ModalWindowComponent implements OnInit, OnDestroy {
  constructor(private modalWindowService: ModalWindowService) {}

  private vision: any;
  private form: any;
  public whatIsTheForm: any;
  public userName = '';

  public ngOnInit(): void {
    this.vision = this.modalWindowService.visible.subscribe((value: boolean) => console.log(value));
    this.form = this.modalWindowService.modalWindow.subscribe((value: any) => {
      this.whatIsTheForm = value;
    });
  }

  ngOnDestroy(): void {
    if (this.vision) {
      this.vision.unsubscribe();
    }
    if (this.form) {
      this.form.unsubscribe();
    }
  }

  @Input() title: string = '';

  @HostListener('window:keydown', ['$event'])
  hotKeys(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case 27:
        console.log('esc');
        setTimeout(() => {
          // this.modalWindowService.modalWindow.next('login');
          this.modalWindowService.visible.next(false);
        }, 200);
        break;
      case 9:
        event.preventDefault();
        console.log('tab');
        break;
      case 13:
        event.preventDefault();
        this.modalWindowService.modalWindow.next(this.whatIsTheForm);

        console.log('enter');
        console.log('log ', this.whatIsTheForm);

        switch (this.whatIsTheForm) {
          case 'login':
            alert('login will be here');
            console.log('login will be here');
            break;
          case 'candidates card':
            alert('candidates cards will be save');
            console.log('candidates cards will be save');
            break;
          case 'time':
            alert('choose the ime will be here');
            console.log('choose the time will be here');
            break;
          case 'english':
            break;

          default:
            break;
        }
    }
  }
}
