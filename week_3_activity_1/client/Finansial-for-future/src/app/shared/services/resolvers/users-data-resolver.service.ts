import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { LocalUsersService } from '../local-users.service';
import { UsersDataService } from '../users-data.service';

@Injectable({
  providedIn: 'root'
})
export class UsersDataResolverService implements Resolve<any> {
  constructor(
    private dataService: UsersDataService
  ) { }
  
  resolve() {
    return this.dataService.fetchUsers();
  }

}