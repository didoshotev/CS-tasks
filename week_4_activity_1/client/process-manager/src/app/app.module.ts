import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './featured/home-page/home-page.component';
import { LoginPageComponent } from './featured/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProcessListComponent } from './featured/home-page/process-list/process-list.component';
import { ProcessInfoComponent } from './featured/home-page/process-info/process-info.component';
import { OrgPageComponent } from './featured/org-page/org-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    ProcessListComponent,
    ProcessInfoComponent,
    OrgPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
