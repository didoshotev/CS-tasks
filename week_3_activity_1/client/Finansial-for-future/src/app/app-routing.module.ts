import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';
import { LoanPageComponent } from './loan-page/loan-page.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home',  component: HomeComponent},
    { path: 'form/new', component: FormComponent },
    { path: 'form/edit/:id', component: FormComponent},
    { path: 'loan/:id', component: LoanPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
