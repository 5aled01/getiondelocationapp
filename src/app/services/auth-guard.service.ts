import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Cookie } from 'ng2-cookies';
 
import { Observable } from 'rxjs';
 
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService  implements CanActivate  {

  
  constructor(
    private router: Router,
    private authService: AuthService
) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
   
    return new Promise(
      (resolve, reject) =>{
               
        if(localStorage.getItem('isAuthp') =='true') {
         resolve(true);
        }else{
          const isAuthe = localStorage.getItem('isAuthe') 
           if(isAuthe==='true'){
           this.router.navigate(['/menu']);
           }else{
          this.router.navigate(['/principale','auth/signin']);
          resolve(false);
           }
           }
      }
         );
}
 
 
}
