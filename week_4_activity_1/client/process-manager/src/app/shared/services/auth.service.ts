import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public helper = new JwtHelperService();
  public user = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  public login(username: string, password: string) {

    return this.http.post<any>(`${environment.api_url}/users/login`,
      {
        username,
        password

      }).pipe(
        map(res => {
          this.handleAuthentication(username, res.accessToken);
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

    const user = this.localStorageService.getData();

    if (!this.isAuthenticated()) { this.logout() }

    const loadedUser = new User(
      user.username,
      user.organizationsCollection,
      user._id,
      user.token
    );
    this.user.next(user);
    this.localStorageService.setData(loadedUser);
  }


  public logout() {
    this.localStorageService.clearData('user');
    this.router.navigateByUrl('/login');
  }

  private handleAuthentication(username, accessToken) {
    const decodedToken = this.helper.decodeToken(accessToken);

    const user = new User(
      username,
      decodedToken.organizationsCollection,
      decodedToken.id,
      accessToken,
    );

    this.user.next(user);
    this.localStorageService.setData(user);
  }

  public isAuthenticated(): boolean {

    const user = this.localStorageService.getData();
    return !this.helper.isTokenExpired(user.token);
  }
}
