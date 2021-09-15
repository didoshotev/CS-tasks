import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Agent } from '../models/agent.model';

export interface IAuthResponseUser {
  passowrd: string,
  username: string,
  type: string,
  __v: number,
  _id: string;
}

export interface IAuthResponseData {
  user: IAuthResponseUser,
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  agent = new BehaviorSubject<Agent>(null);

  constructor(private http: HttpClient, private router: Router) { }

  public login(username: string, password: string) {

    return this.http.post<IAuthResponseData>(`${environment.api_url}/agents/login`,
      {
        username,
        password

      }, { observe: 'response' }).pipe(
        map(res => {
          this.handleAuthentication(res.body.user.username, res.body.user.type, res.body.token);
        }),
        catchError(err => {
          console.log('Error while logging in...', err);
          return err
        }),
      ).subscribe(res => {
        this.router.navigateByUrl('/home');
      })
  }

  public autoLogin() { 
    
    const agent = JSON.parse(localStorage.getItem('userData'));    
    if(!agent) { return; }

    const loadedUser = new Agent(agent.username, agent.type, agent.token)
    this.agent.next(loadedUser);
  }

  public logout() { 
    this.agent.next(null);
    this.router.navigateByUrl('/login');
    localStorage.removeItem('userData');
  }

  private handleAuthentication(username: string, type: string, token: string) {
    const user = new Agent(username, type, token);
    this.agent.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
