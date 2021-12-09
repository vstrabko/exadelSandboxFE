import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFilesComponent } from './upload-files.component';
import { InternationalizationModule } from 'src/app/internationalization/internationalization.module';
import { LocalizationService } from 'src/app/internationalization/localization.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [UploadFilesComponent],
  imports: [
    CommonModule,
    InternationalizationModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  exports: [UploadFilesComponent],
  providers: [LocalizationService],
})
export class UploadFilesModule {}
