import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { CommonModule } from '@angular/common';
import { FormModule } from './form/form.module';
import { SharedModule } from './shared/shared.module';
import { LoanPageComponent } from './loan-page/loan-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LoanPageComponent
  ],
  
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HomeModule,
    FormModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
