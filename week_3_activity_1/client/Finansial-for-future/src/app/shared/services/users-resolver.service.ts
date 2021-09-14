import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { UserNew } from "../models/user.modelNew";
import { LocalUsersService } from "./local-users.service";
import { UsersService } from "./users.service";

@Injectable({
    providedIn: 'root',
})

export class UsersResolverService implements Resolve<any>{
    
    constructor(
        private usersService: UsersService,
        private localeUsersService: LocalUsersService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        const users = this.localeUsersService.getUsers();

        if (users.length === 0) {
            console.log('fetching in resolver');
            
            return this.usersService.fetchUsers();
        }
        console.log('just return');
        return users
    }
}

