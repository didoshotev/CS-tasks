import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { UsersDataService } from '../users-data.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataResolverService implements Resolve<any> {
  constructor(
    private dataService: UsersDataService,
  ) { }
  
  resolve(route: ActivatedRouteSnapshot) {
    const id = route.params.id;
    
    return this.dataService.fetchUserById(id);
  }

}