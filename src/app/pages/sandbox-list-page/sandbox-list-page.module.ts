import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { SandboxListPageComponent } from './candidate-table/sandbox-list-page.component';
import { InternationalizationModule } from 'src/app/internationalization/internationalization.module';

@NgModule({
  declarations: [SandboxListPageComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSortModule,
    InternationalizationModule,
  ],
  exports: [SandboxListPageComponent],
})
export class SandboxListPageModule {}
