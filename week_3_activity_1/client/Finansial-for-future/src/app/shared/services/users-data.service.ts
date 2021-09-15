import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { IFormCreateResponse, IUserNew } from '../interfaces';
import { UserNew } from '../models/user.modelNew';
import { LocalUsersService } from './local-users.service';

const API_URL = 'http://localhost:5000/api'

@Injectable({
    providedIn: 'root'
})
export class UsersDataService {

    constructor(
        private http: HttpClient,
        private localUsersService: LocalUsersService
    ) { }

    fetchUsers() {
        return this.http.get<UserNew[]>(`${API_URL}/users`)
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
        return this.http.get<UserNew>(`${API_URL}/users/${id}`)
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
        const users = this.http.get<IUserNew[]>(`${API_URL}/users`);
        return users;
    }

    createUser(user: IFormCreateResponse) {
        return this.http.post(
            `${API_URL}/users`,
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
            `${API_URL}/users/${id}`,
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
        this.http.delete(`${API_URL}/users/${id}`).subscribe();
    }
}
