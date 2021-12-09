import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalWindowComponent } from './modal-window.component';
import { InternationalizationModule } from 'src/app/internationalization/internationalization.module';
import { LocalizationService } from 'src/app/internationalization/localization.service';

@NgModule({
  declarations: [ModalWindowComponent],
  imports: [CommonModule, InternationalizationModule],
  exports: [ModalWindowComponent],
  providers: [LocalizationService],
})
export class ModalWindowModule {}
