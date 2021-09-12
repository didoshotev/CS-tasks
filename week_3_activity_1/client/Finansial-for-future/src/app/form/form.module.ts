import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule
  ]
})
export class FormModule { }
