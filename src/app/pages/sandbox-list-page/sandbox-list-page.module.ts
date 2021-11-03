import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SandboxListPageComponent } from './sandbox-list-page.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SandboxListPageComponent],
  exports: [SandboxListPageComponent],
})
export class SandboxListPageModule {}
