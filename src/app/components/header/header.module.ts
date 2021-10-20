
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header.component';

@NgModule({
  imports: [
    MatButtonModule,
    CommonModule
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [ HeaderComponent ]
})
export class HeaderModule {}
