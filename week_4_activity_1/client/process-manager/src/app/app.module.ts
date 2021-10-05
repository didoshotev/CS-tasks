import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './featured/home-page/home-page.component';
import { LoginPageComponent } from './featured/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProcessListComponent } from './featured/home-page/process-dashboard/process-list/process-list.component';
import { ProcessInfoComponent } from './featured/home-page/process-dashboard/process-info/process-info.component';
import { OrgPageComponent } from './featured/org-page/org-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ProcessDashboardComponent } from './featured/home-page/process-dashboard/process-dashboard.component';
import { SnackBarComponent } from './shared/snack-bar/snack-bar.component';
import { ProcessPageModule } from './featured/process-page/process-page.module';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    ProcessListComponent,
    ProcessInfoComponent,
    OrgPageComponent,
    ProcessDashboardComponent,
    SnackBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatStepperModule,
    MatCheckboxModule,
    ProcessPageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
