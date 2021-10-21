import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header.component';
import { LoginFormModule } from '../login-form/login-form.module';

@NgModule({
  imports: [MatButtonModule, CommonModule, LoginFormModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class HeaderModule {}
