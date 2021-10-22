import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ModalWindowModule } from '../modal-window/modal-window.module';
import { LoginFormComponent } from './login-form.component';

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    ModalWindowModule,
  ],
  exports: [LoginFormComponent],
})
export class LoginFormModule {}
