import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupChooseTheTimeComponent } from './popup-choose-the-time.component';
import { ModalWindowModule } from '../modal-window/modal-window.module';
import { TimeModule } from './time/time.module';

@NgModule({
  declarations: [PopupChooseTheTimeComponent],
  imports: [
    CommonModule,
    ModalWindowModule,
    TimeModule,
  ],
  exports: [PopupChooseTheTimeComponent],
})
export class PopupChooseTheTimeModule {}
