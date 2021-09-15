import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { LocalUsersService } from '../local-users.service';
import { UsersDataService } from '../users-data.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataResolverService implements Resolve<any> {
  constructor(
    private dataService: UsersDataService,
    private router: Router
  ) { }
  
  resolve(route: ActivatedRouteSnapshot) {
    const id = route.params.id;
    
    return this.dataService.fetchUserById(id);
  }

}