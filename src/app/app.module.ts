import { AdminMainPageModule } from './pages/admin-main-page/admin-main-page.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderModule } from './components/header/header.module';
import { FooterModule } from './components/footer/footer.module';
import { HomePageModule } from './pages/home-page/home-page.module';
import { CreateSandboxPageModule } from './pages/create-sandbox-page/create-sandbox-page.module';
import { CandidateModule } from './components/candidate/candidate.module';
import { CandidateCardPopupModule } from './components/candidate-card-popup/candidate-card-popup.module';
import { ErrorPageModule } from './pages/error-page/error-page.module';
import { CandidateRequestModule } from './components/candidate-request/candidate-request.module';
import { CalendarPageModule } from './pages/calendar-page/calendar-page.module';
import { PopupChooseTheTimeModule } from './components/popup-choose-the-time/popup-choose-the-time.module';

import { InternationalizationModule } from './internationalization/internationalization.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SandboxListPageModule } from './pages/sandbox-list-page/sandbox-list-page.module';
import { CandidateTableModule } from './components/candidate-table/candidate-table.module';

import { HttpHeadersInterceptor } from './interceptors/http-headers.interceptors';
import { AuthService } from './services/auth.service';

import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import timegridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, '../assets/locales/', '.json');
}
FullCalendarModule.registerPlugins([dayGridPlugin, timegridPlugin, interactionPlugin, listPlugin]);
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
    AdminMainPageModule,
    HttpClientModule,
    SandboxListPageModule,
    InternationalizationModule.forRoot({ locale_id: 'en' }), // iniating with default language: en
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    CandidateRequestModule,
    CalendarPageModule,
    PopupChooseTheTimeModule,
    FullCalendarModule,
    CandidateTableModule,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
