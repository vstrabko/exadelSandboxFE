import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupConfirmComponent } from './popup-confirm.component';
import { ModalWindowModule } from '../modal-window/modal-window.module';

import { InternationalizationModule } from 'src/app/internationalization/internationalization.module';
import { LocalizationService } from 'src/app/internationalization/localization.service';


@NgModule({
  declarations: [PopupConfirmComponent],
  imports: [
    CommonModule,
    InternationalizationModule,
    ModalWindowModule
  ],
  exports: [PopupConfirmComponent],
  providers: [LocalizationService]
})
export class PopupConfirmModule { }
