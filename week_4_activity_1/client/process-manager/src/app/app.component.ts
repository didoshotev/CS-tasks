import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './shared/models/user.model';
import { AuthService } from './shared/services/auth.service';
import { LocalStorageService } from './shared/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'process-manager';
  user: User = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService 
  ) { }

  ngOnInit(): void { 
    this.authService.autoLogin();

    this.authService.user.subscribe(userData => { 
      this.user = userData;
    })
  }

  public onHandleHomeNavigation() {
    this.router.navigateByUrl('/home');
  }

  public onHandleLoginNavigation() {
    this.router.navigateByUrl('/login');
  }

  public onHandleLogout() {
    this.authService.logout();
  }

  public onHandleAddOrgNavigation() { 
    this.router.navigateByUrl('organization/new');
  }
}
