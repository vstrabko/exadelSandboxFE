import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SandboxListPageComponent } from './sandbox-list-page.component';
import { InternationalizationModule } from 'src/app/internationalization/internationalization.module';

@NgModule({
  imports: [CommonModule, InternationalizationModule],
  declarations: [SandboxListPageComponent],
  exports: [SandboxListPageComponent],
})
export class SandboxListPageModule {}
