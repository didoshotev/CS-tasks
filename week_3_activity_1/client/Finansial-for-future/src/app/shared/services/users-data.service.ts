import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { IFormCreateResponse, IUserNew } from '../interfaces';
import { UserNew } from '../models/user.modelNew';
import { LocalUsersService } from './local-users.service';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from './local-storage.service';

// const api_url = 'http://localhost:5000/api'

@Injectable({
    providedIn: 'root'
})
export class UsersDataService {
        
    constructor(
        private http: HttpClient,
        private localUsersService: LocalUsersService,
        private localStorageService: LocalStorageService,
    ) { }

    public fetchUsers() {
        return this.http.get<UserNew[]>(`${environment.api_url}/users`)
            .pipe(
                map(users => {
                    return users.map(user => {
                        const processedUser = this.processUser(user);
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

    public fetchUserById(id: string) {
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

    public getAllUsers(): Observable<IUserNew[]> {
        const users = this.http.get<IUserNew[]>(`${environment.api_url}/users`);
        return users;
    }

    public createUser(user: IFormCreateResponse) {
        const localStorageData = this.localStorageService.getData();
        const headers = new HttpHeaders({ 'bearer': localStorageData._token });

        return this.http.post(
            `${environment.api_url}/users`,
            user,
            { headers }
        ).pipe(
            map(user => { 
                const newUser = this.processUser(user);
                this.localUsersService.addUser(newUser);
                return { 
                    ...newUser
                }
            }), 
            catchError(err => {
                console.log('ERROR occured while creating user', err);
                return err
            }),
        ).subscribe();
    }

    public editUser(user: IUserNew, id: string) {
        const localStorageData = this.localStorageService.getData();
        const headers = new HttpHeaders({ 'bearer': localStorageData._token });

        delete user.id;

        return this.http.put(
            `${environment.api_url}/users/${id}`,
            user,
            { headers }
        ).pipe(
            map(newUser => { 
                const processedUser = this.processUser(newUser);
                this.localUsersService.updateUser(processedUser.id, processedUser);
                return { 
                    ...processedUser
                }
            }),
            catchError(err => {
                console.log('ERROR occured while editing user', err);
                return err
            }),
        ).subscribe();
    }

    public deleteUser(id) {
        const localStorageData = this.localStorageService.getData();
        const headers = new HttpHeaders({ 'bearer': localStorageData._token });

        this.localUsersService.deleteUser(id);
        this.http.delete(`${environment.api_url}/users/${id}`,{ headers }).subscribe();
    }

    public changeUserType(newType: string, id: string) {
        const localStorageData = this.localStorageService.getData();
        const headers = new HttpHeaders({ 'bearer': localStorageData._token });
        
        return this.http.patch(
            `${environment.api_url}/users/${id}`,
            {
                type: newType
            }, { headers }
        ).pipe(
            tap(user => {
                const processedUser = this.processUser(user)
                this.localUsersService.updateUser(processedUser.id, processedUser);
                
                return { 
                    ...processedUser
                }
            }),
            catchError(err => {
                console.log('ERROR occured while changing user type', err);
                return err
            })
        ).subscribe();
    }

    private processUser(user) { 
        const userObject = new UserNew(
            user.firstName, user.middleName, user.lastName, user.streetAddress,
            user.moneyBalance, user.creditCards, user._id, user.type, user.loansCollection || []);

        return userObject.currentUser;
    }
}
