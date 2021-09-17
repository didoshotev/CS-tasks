import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import GlobalRefence from './Globals';
import { HomeComponent } from './home/home.component';
import { LoanPageComponent } from './loan-page/loan-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ManagerPanelPageComponent } from './manager-panel-page/manager-panel-page.component';
import { RoleGuardService as RoleGuard } from './shared/services/guards/role-guard.service';
import { UserDataResolverService as UserResolver } from './shared/services/resolvers/user-data-resolver.service';
import { UsersDataResolverService as UsersResolver } from './shared/services/resolvers/users-data-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  
  { path: 'home', component: HomeComponent, resolve: { usersCollection: UsersResolver } },
  
  {
    path: 'form/new', component: FormComponent,
    canActivate: [RoleGuard], data: { expectedRole: GlobalRefence.agentTypes.STANDART }
  },

  {
    path: 'form/edit/:id', component: FormComponent, resolve: { user: UserResolver },
    canActivate: [RoleGuard], data: { expectedRole: GlobalRefence.agentTypes.STANDART }
  },

  {
    path: 'loan/:id', component: LoanPageComponent,
    resolve: { user: UserResolver },
    canActivate: [RoleGuard], data: { expectedRole: GlobalRefence.agentTypes.STANDART }
  },

  { path: 'login', component: LoginPageComponent },
  {
    path: 'manager-panel', component: ManagerPanelPageComponent,
    resolve: { usersCollection: UsersResolver },
    canActivate: [RoleGuard], data: { expectedRole: GlobalRefence.agentTypes.MANAGER }
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
