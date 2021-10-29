import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header.component';
import { LoginFormModule } from '../login-form/login-form.module';
import { AppRoutingModule } from '../../app-routing.module';

@NgModule({
  imports: [MatButtonModule, CommonModule, LoginFormModule, AppRoutingModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class HeaderModule {}
