import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { Observable } from 'rxjs';
import { promise } from 'selenium-webdriver';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  
  constructor(
    private router: Router,
    private authService: AuthService
) { }

canActivate(route: ActivatedRouteSnapshot,
   state: RouterStateSnapshot): Observable <boolean> | Promise<boolean> | boolean {

    const isAuth = this.authService.isAuth;
    if (isAuth == true) {
        return true;
    }else{
      this.router.navigate(['/auth','signin']);
      return false;
    }

    
}
}
