import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { CommonModule } from '@angular/common';
import { FormModule } from './form/form.module';
import { SharedModule } from './shared/shared.module';
import { LoanPageComponent } from './loan-page/loan-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { ManagerPanelPageComponent } from './manager-panel-page/manager-panel-page.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AuthInterceptorService as AuthInterceptor} from './shared/services/interceptors/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoanPageComponent,
    LoginPageComponent,
    ManagerPanelPageComponent
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
    RouterModule,
    DragDropModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
