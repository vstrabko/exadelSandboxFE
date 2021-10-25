import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSandboxPageComponent } from './pages/create-sandbox-page/create-sandbox-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  {path: '', component: HomePageComponent },
  {path: 'sandbox', component:  CreateSandboxPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
