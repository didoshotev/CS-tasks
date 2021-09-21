import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Agent } from '../models/agent.model';
import { JwtHelperService } from "@auth0/angular-jwt";
import { LocalStorageService } from './local-storage.service';
import GlobalRefence from 'src/app/Globals';
import { InterceptorSkipHeader } from './interceptors/auth-skip'; 

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
  public helper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
    ) { }

  public login(username: string, password: string) {

    return this.http.post<any>(`${environment.api_url}/agents/login`,
      {
        username,
        password

      }, { observe: 'response', headers: InterceptorSkipHeader }).pipe(
        map(res => {
          this.handleAuthentication(res.body.accessToken);
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
    
    const agent = this.localStorageService.getData();
    
    if(!this.isAuthenticated()) { this.logout() }

    const loadedUser = new Agent(agent.id, agent.type, agent._token, agent._tokenExpirationDate);
    this.agent.next(loadedUser);
  }

  public logout() { 
    this.agent.next(null);
    this.router.navigateByUrl('/login');
    localStorage.removeItem('userData');
  }

  private handleAuthentication(accessToken) {
    const decodedToken = this.helper.decodeToken(accessToken);
    const expirationDate = new Date(decodedToken.exp * 1000);

    const user = new Agent(decodedToken.id, decodedToken.type, accessToken, expirationDate);
    
    this.agent.next(user);
    this.localStorageService.setData(user);
  }

  public isAuthenticated(): boolean { 
    
    const agent = this.localStorageService.getData();
    return !this.helper.isTokenExpired(agent._token);
  }

  public isManager(): boolean { 
    return this.localStorageService.getData().type === GlobalRefence.agentTypes.MANAGER;
  }

  public isManagerOrStandart(): boolean { 
    return this.isManager() ||
           this.localStorageService.getData().type === GlobalRefence.agentTypes.STANDART  
  }
}
