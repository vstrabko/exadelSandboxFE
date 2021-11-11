import { AdminMainPageComponent } from './pages/admin-main-page/admin-main-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSandboxPageComponent } from './pages/create-sandbox-page/create-sandbox-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CandidateListComponent } from './components/candidate/candidate-list/candidate-list.component';
import { CalendarPageComponent } from './pages/calendar-page/calendar-page.component';
import { SandboxListPageComponent } from './pages/sandbox-list-page/sandbox-list-page/sandbox-list-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'admin-main-page', component: AdminMainPageComponent },
  { path: 'users', component: CandidateListComponent },
  { path: 'calendar', component: CalendarPageComponent },
  { path: 'sandbox', component: SandboxListPageComponent },
  { path: 'sandbox/create', component: CreateSandboxPageComponent },

  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
