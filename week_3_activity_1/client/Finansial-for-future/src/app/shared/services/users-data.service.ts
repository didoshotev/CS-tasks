import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { IFormCreateResponse, IUserNew } from '../interfaces';
import { UserNew } from '../models/user.modelNew';
import { LocalUsersService } from './local-users.service';
import { environment } from '../../../environments/environment';

// const api_url = 'http://localhost:5000/api'

@Injectable({
    providedIn: 'root'
})
export class UsersDataService {

    constructor(
        private http: HttpClient,
        private localUsersService: LocalUsersService
    ) { }

    fetchUsers() {
        return this.http.get<UserNew[]>(`${environment.api_url}/users`)
            .pipe(
                map(users => {
                    return users.map(user => {

                        const userObject = new UserNew(
                            user.firstName, user.middleName, user.lastName, user.streetAddress,
                            user.moneyBalance, user.creditCards, user._id, user.type, user.loansCollection || []);

                        const processedUser = userObject.currentUser;
                        return {
                            ...processedUser
                        }
                    })
                }),
                tap(users => {
                    this.localUsersService.setUsers(users);
                })
            )
    }

    fetchUserById(id: string) {
        return this.http.get<UserNew>(`${environment.api_url}/users/${id}`)
            .pipe(
                map(user => {
                    const userObject = new UserNew(
                        user.firstName, user.middleName, user.lastName, user.streetAddress,
                        user.moneyBalance, user.creditCards, user._id, user.type, user.loansCollection || []);

                    const processedUser = userObject.currentUser;
                    return {
                        ...processedUser
                    }
                })
            )
    }

    //  ------

    getAllUsers(): Observable<IUserNew[]> {
        const users = this.http.get<IUserNew[]>(`${environment.api_url}/users`);
        return users;
    }

    createUser(user: IFormCreateResponse) {
        return this.http.post(
            `${environment.api_url}/users`,
            user
        ).pipe(
            catchError(err => {
                console.log('ERROR occured while creating user', err);
                return err
            }),
        ).subscribe();
    }

    editUser(user: IUserNew, id: string) {
        this.localUsersService.updateUser(id, user);

        delete user.id;

        return this.http.put(
            `${environment.api_url}/users/${id}`,
            user
        ).pipe(
            catchError(err => {
                console.log('ERROR occured while editing user', err);
                return err
            }),
        ).subscribe();
    }

    deleteUser(id) {
        this.localUsersService.deleteUser(id);
        this.http.delete(`${environment.api_url}/users/${id}`).subscribe();
    }

    changeUserType(newType: string, id: string) {
        console.log('newType', newType);

        return this.http.patch(
            `${environment.api_url}/users/${id}`,
            {
                type: newType
            }
        ).pipe(
            tap(res => {
                console.log('new user object', res);
            }),
            catchError(err => {
                console.log('ERROR occured while changing user type', err);
                return err
            })
        ).subscribe()
    }
}
