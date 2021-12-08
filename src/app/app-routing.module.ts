import { AdminMainPageComponent } from './pages/admin-main-page/admin-main-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSandboxPageComponent } from './pages/create-sandbox-page/create-sandbox-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CalendarPageComponent } from './pages/calendar-page/calendar-page.component';
import { SandboxListPageComponent } from './pages/sandbox-list-page/sandbox-list-page/sandbox-list-page.component';
import { UploadFilesComponent } from './pages/upload-files/upload-files.component';
import { GoogleAuthComponent } from './pages/google-auth/google-auth.component';
import { CandidateGuard } from './guards/candidate.guard';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'candidates', component: AdminMainPageComponent, canActivate: [CandidateGuard] },
  { path: 'calendar', component: CalendarPageComponent, canActivate: [CandidateGuard] },
  { path: 'sandbox', component: SandboxListPageComponent, canActivate: [CandidateGuard] },
  { path: 'sandbox/create', component: CreateSandboxPageComponent, canActivate: [CandidateGuard] },
  { path: 'upload-files/:token', component: UploadFilesComponent },
  {
    path: 'api/google/authorization/callback',
    component: GoogleAuthComponent,
    pathMatch: 'prefix',
    canActivate: [CandidateGuard],
  },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
