import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { IFormCreateResponse, IUser, IUserNew } from '../interfaces';
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
                    this.localUsersService.setUsers2(users);
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
                    // console.log('processedUser', processedUser);

                    return {
                        ...processedUser
                    }
                })
            )
    }

    //  ------

    getAllUsers(): Observable<IUser[]> {
        const users = this.http.get<IUser[]>(`${API_URL}/users`);
        return users;
    }

    createUser(user: IFormCreateResponse) {
        return this.http.post(
            `${API_URL}/users`,
            user
        ).pipe(
            map(res => {
                console.log('res in pipe map', res);
            }),
            catchError(err => {
                console.log('ERROR occured while creating user', err);
                return err
            }),
        ).subscribe();
    }

    editUser(user: IUserNew, id: string) {
        this.localUsersService.updateUser2(id, user);

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

    addLoan(user: IUser) {
        const { firstName, middleName, lastName, loan, moneyBalance, creditCards, streetAddress } = user;
        const newUserObject = {
            firstName, middleName, lastName, loan, moneyBalance, creditCards, streetAddress
        }

        return this.http.put(
            `${API_URL}/users/${user._id}`,
            newUserObject
        ).pipe(
            catchError(err => {
                console.log('ERROR occured while adding LOAN to the user', err);
                return err
            }),
        ).subscribe();
    }

    deleteUser(id) {
        this.localUsersService.deleteUser2(id);
        this.http.delete(`${API_URL}/users/${id}`).subscribe();
    }
}
