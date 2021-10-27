import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSandboxPageComponent } from './pages/create-sandbox-page/create-sandbox-page.component';
import { CandidateCardPopupComponent } from './components/candidate-card-popup/candidate-card-popup/candidate-card-popup.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'user', component: CandidateCardPopupComponent },
  { path: 'sandbox', component: CreateSandboxPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}