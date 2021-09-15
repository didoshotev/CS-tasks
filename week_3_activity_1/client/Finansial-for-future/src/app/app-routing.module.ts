import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';
import { LoanPageComponent } from './loan-page/loan-page.component';
import { UserDataResolverService } from './shared/services/resolvers/user-data-resolver.service';
import { UsersDataResolverService } from './shared/services/resolvers/users-data-resolver.service';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home',  component: HomeComponent, resolve: {usersCollection: UsersDataResolverService},},
    { path: 'form/new', component: FormComponent },
    { path: 'form/edit/:id', component: FormComponent, resolve: {user: UserDataResolverService}},
    { path: 'loan/:id', component: LoanPageComponent, resolve: { user: UserDataResolverService}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
