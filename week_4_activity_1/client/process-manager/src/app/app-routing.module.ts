import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './featured/home-page/home-page.component';
import { LoginPageComponent } from './featured/login-page/login-page.component';
import { OrgPageComponent } from './featured/org-page/org-page.component';
import { ProcessPageComponent } from './featured/process-page/process-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'organization/new', component: OrgPageComponent },
  { path: 'process/:organizationId', component: ProcessPageComponent },
  { path: 'process/:organizationId/:processId', component: ProcessPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
