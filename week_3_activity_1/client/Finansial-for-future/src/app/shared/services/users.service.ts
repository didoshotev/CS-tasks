import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'
import { IFormCreateResponse, IUser } from '../interfaces';

const API_URL = 'http://localhost:5000/api'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<IUser[]> { 
    const users = this.http.get<IUser[]>(`${API_URL}/users`);
    return users;
  }

  createUser(user: IFormCreateResponse) {
    console.log(user);

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

  editUser(user: IFormCreateResponse, id) {
    
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
    const { firstName, middleName, lastName, loan, moneyBalance, creditCards, streetAddress} = user;
    const newUserObject = { 
      firstName, middleName, lastName, loan, moneyBalance, creditCards, streetAddress }
    
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
    this.http.delete(`${API_URL}/users/${id}`)
      .subscribe();
  }
}
