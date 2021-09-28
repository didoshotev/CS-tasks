import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { LocalStorageService } from './shared/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'process-manager';

  constructor(
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService 
  ) { }

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
