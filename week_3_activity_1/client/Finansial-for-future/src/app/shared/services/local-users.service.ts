import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IUser, IUserNew } from '../interfaces';
import { User } from '../models/user.model';
import { UserNew } from '../models/user.modelNew';

@Injectable({
  providedIn: 'root'
})

export class LocalUsersService {

  usersChanged = new Subject<User[]>();
  userEmitter = new EventEmitter<IUser>();

  userSubject = new BehaviorSubject<any>(null);

  public usersCollectionSubject = new BehaviorSubject<IUserNew[]>([]);
  public usersCollectionLocal: IUserNew[] = [];

  private users: any[] = [];

  constructor() { }
  // change IUser !
  setUsers(users: any) {
    this.users = users;
    this.usersChanged.next(this.users.slice());
  }

  getUsers() {
    return this.users.slice();
  }

  addUser(user: User) {
    this.users.push(user);
    this.usersChanged.next(this.users.slice());
  }

  updateUser(id: string, newUser: User) {
    // this.users[index] = newUser;
    const index = this.getUserIndexById(id);
    this.users.splice(index, 1, newUser)
    this.usersChanged.next(this.users.slice());
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);
    this.usersChanged.next(this.users.slice());
  }

  // -----

  // users

  public setUsers2(users: IUserNew[]) {
    this.usersCollectionLocal = users;
    this.usersCollectionSubject.next({ ...this.usersCollectionLocal });
  }

  public getUsersCollection() {
    return this.usersCollectionSubject.asObservable();
  }

  public addUser2(user: IUserNew) {
    this.usersCollectionLocal.push(user);
    this.usersCollectionSubject.next({ ...this.usersCollectionLocal });
  }

  public updateUser2(id: string, updatedUserObject: IUserNew) {
    const index: number = this.getUserIndexById2(id);
    this.usersCollectionLocal.splice(index, 1, updatedUserObject);
    this.usersCollectionSubject.next({ ...this.usersCollectionLocal })
  }
  
  public deleteUser2(id: string) {
    const index:number = this.getUserIndexById2(id);
    this.usersCollectionLocal.splice(index, 1);
    this.usersCollectionSubject.next({ ...this.usersCollectionLocal});
  }

  // public getUserById2(id: string): Observable<IUserNew> { 
  //   const user = this.getUserById(id);
  //   return user.
  // }


  // user
  emitUser(user) {
    this.userSubject.next(user);
  }

  getUser(): Observable<any> {
    return this.userSubject.asObservable();
  }


  private getUserById(id) { 
    return this.usersCollectionLocal.find(user => user.id === id);
  }

  private getUserIndexById2(id) { 
    return this.usersCollectionLocal.findIndex(user => user.id === id);
  }

  getUserIndexById(id) {
    return this.users.find(user => user.id === id);
  }

}
