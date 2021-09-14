import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IUser } from '../interfaces';
import { User } from '../models/user.model';
import { UserNew } from '../models/user.modelNew';

@Injectable({
  providedIn: 'root'
})

export class LocalUsersService {

  usersChanged = new Subject<User[]>();
  userEmitter = new EventEmitter<IUser>();
  userSubject = new BehaviorSubject<any>(null);

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

  emitUser(user) { 
    this.userSubject.next(user);
  }

  getUserIndexById(id) { 
    return this.users.find(user => user.id === id);
  }

  getUser() { 
    return this.userSubject.asObservable();
  }

}
