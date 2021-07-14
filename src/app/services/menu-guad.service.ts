import { Cookie } from 'ng2-cookies';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
 
import { Observable } from 'rxjs';
 
import { AuthService } from './auth.service';

@Injectable()
export class MenuGuardService  implements CanActivate  {

  
  constructor(
    private router: Router,
    private authService: AuthService
) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
   
    return new Promise(
      (resolve, reject) =>{
        const isAuthe = localStorage.getItem('isAuthe') ;
        if(isAuthe==='true')  {
         resolve(true);
        }else{
        
          this.router.navigate(['/principale']);
          resolve(false);
           }
      }
         );
}
 
 
}