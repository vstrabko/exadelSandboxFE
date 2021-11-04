import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SandboxListPageComponent } from './sandbox-list-page.component';
import { InternationalizationModule } from 'src/app/internationalization/internationalization.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { SandboxCardModule } from 'src/app/components/sandbox-card/sandbox-card.module';

@NgModule({
  imports: [
    CommonModule,
    InternationalizationModule,
    MatSelectModule,
    MatPaginatorModule,
    SandboxCardModule,
  ],
  declarations: [SandboxListPageComponent],
  exports: [SandboxListPageComponent],
})
export class SandboxListPageModule {}
