import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupChooseTheTimeComponent } from './popup-choose-the-time.component';
import { ModalWindowModule } from '../modal-window/modal-window.module';
import { TimeModule } from './time/time.module';
import { InternationalizationModule } from 'src/app/internationalization/internationalization.module';
import { LocalizationService } from 'src/app/internationalization/localization.service';

@NgModule({
  declarations: [PopupChooseTheTimeComponent],
  imports: [CommonModule, ModalWindowModule, TimeModule, InternationalizationModule],
  exports: [PopupChooseTheTimeComponent],
  providers: [LocalizationService],
})
export class PopupChooseTheTimeModule {}
