import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { HeaderModule } from './components/header/header.module';
import { FooterModule } from './components/footer/footer.module';
import { HomePageModule } from './pages/home-page/home-page.module';
import { CreateSandboxPageModule } from './pages/create-sandbox-page/create-sandbox-page.module';
import { CandidateModule } from './components/candidate/candidate.module';
import { CandidateCardPopupModule } from './components/candidate-card-popup/candidate-card-popup.module';
import { ErrorPageModule } from './pages/error-page/error-page.module';
import { CalendarModule } from './components/calendar/calendar.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HeaderModule,
    HeaderModule,
    HomePageModule,
    FooterModule,
    CreateSandboxPageModule,
    CandidateModule,
    CandidateCardPopupModule,
    ErrorPageModule,
    CalendarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
