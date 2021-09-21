import {  Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IUserNew } from '../interfaces';

@Injectable({
  providedIn: 'root'
})

export class LocalUsersService {

  usersChanged = new Subject<IUserNew[]>();
  userSubject = new BehaviorSubject<any>(null);

  public usersCollectionSubject = new BehaviorSubject<IUserNew[]>([]);
  public usersCollectionLocal: IUserNew[] = [];

  private users: IUserNew[] = [];

  constructor() { }

  public setUsers(users: IUserNew[]) {
    
    this.usersCollectionLocal = users;
    this.usersCollectionSubject.next({ ...this.usersCollectionLocal });
  }

  public getUsersCollection() {
    return this.usersCollectionSubject.asObservable();
  }

  public addUser(user: IUserNew) {
    
    this.usersCollectionLocal.push(user);
    this.usersCollectionSubject.next({ ...this.usersCollectionLocal });
  }

  public updateUser(id: string, updatedUserObject: IUserNew) {
    
    const index: number = this.getUserIndexById2(id);
    
    this.usersCollectionLocal.splice(index, 1, updatedUserObject);
    this.usersCollectionSubject.next( this.usersCollectionLocal )
  }
  
  public deleteUser(id: string) {
    
    const index:number = this.getUserIndexById2(id);
    
    this.usersCollectionLocal.splice(index, 1);
    this.usersCollectionSubject.next({ ...this.usersCollectionLocal});
  }


  // user
  emitUser(user) {
    this.userSubject.next(user);
  }

  getUser(): Observable<any> {
    return this.userSubject.asObservable();
  }

  private getUserIndexById2(id) { 
    return this.usersCollectionLocal.findIndex(user => user.id === id);
  }

  getUserIndexById(id) {
    return this.users.find(user => user.id === id);
  }

}
