import { NgModule } from '@angular/core';
import { UserInfoComponent } from './user-info/user-info.component';
import { UsersListComponent } from './users-list/users-list.component';
import { HomeComponent } from './home.component';
import { UserItemComponent } from './users-list/user-item/user-item.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [UserInfoComponent, UsersListComponent, HomeComponent, UserItemComponent],
  
  imports: [ CommonModule ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
