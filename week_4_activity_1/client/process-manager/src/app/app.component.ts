import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'process-manager';

  constructor(
    private router: Router,
    private authService: AuthService
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
}
