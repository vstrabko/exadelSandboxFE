import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleAuthComponent } from './google-auth.component'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [GoogleAuthComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [GoogleAuthComponent]
})
export class GoogleAuthModule { }
