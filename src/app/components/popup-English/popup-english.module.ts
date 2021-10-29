import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupEnglishComponent } from './popup-english.component';
import { ModalWindowModule } from '../modal-window/modal-window.module';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { LocalizationService } from 'src/app/internationalization/localization.service';
import { InternationalizationModule } from 'src/app/internationalization/internationalization.module';

@NgModule({
  declarations: [PopupEnglishComponent],
  imports: [
    CommonModule,
    ModalWindowModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    InternationalizationModule
  ],
  exports: [PopupEnglishComponent],
  providers: [LocalizationService]
})
export class PopupEnglishModule {}
