import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { Observable } from 'rxjs';
import { promise } from 'selenium-webdriver';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService /* implements CanActivate*/ {

  
  constructor(
    private router: Router,
    private authService: AuthService
) { }/*
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  }

    return new Promise(
      (resolve, reject) =>{
        if(this.authService.isProc2Auth==true) {
         resolve(true);
        }else{
          this.router.navigate(['/principale']);
          resolve(false);
           }
      }
         );
}
*/
 
}
