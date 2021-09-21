import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import GlobalRefence from 'src/app/Globals';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean { 
    
    if(route.data.expectedRole === GlobalRefence.agentTypes.MANAGER && this.authService.isManager()) { 
      return true;
    }
    if(route.data.expectedRole === GlobalRefence.agentTypes.STANDART && this.authService.isManagerOrStandart()) { 
      return true
    }
    
    this.router.navigate(['/home']);
    return false;
  }
}
