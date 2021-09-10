import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../shared/interfaces/';

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
}
