import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SandboxCardComponent } from './sandbox-card.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [CommonModule, MatCheckboxModule, MatCardModule],
  declarations: [SandboxCardComponent],
  exports: [SandboxCardComponent],
})
export class SandboxCardModule {}
