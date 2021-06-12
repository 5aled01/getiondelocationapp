import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Cookie } from 'ng2-cookies';
import { stringify } from '@angular/compiler/src/util';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  
    private apiServerUrl = environment.apiBaseUrl ;
    isAuth: boolean = false;
    

  
  userconncte : User | undefined;
  idc: number | undefined;
 
  constructor(private http: HttpClient,private router :Router) {
    if(Cookie.get('islogin')=='true')
    this.isAuth = true;
   }

  ngOnInit() {
    
}


  signInUser(username: string, password: string) {
      return new Promise <void>((response, reject) => {
        this.http.get<User>(`${this.apiServerUrl}/user/find/${username}&${password}`)
          .toPromise()
          .then(
            (response: User) => {  
              Cookie.set('islogin', 'true');
              this.idc =  response.id;
              Cookie.set('idc', this.idc.toString());
              this.isAuth = true;
              this.userconncte =  response;
              this.router.navigate(['/menu']);
            },
            (error: HttpErrorResponse) => {
              reject(error.message);
              
            }
          );
      });
      
    }

    signOutUser() {
      Cookie.set('islogin', 'false');
      console.log(this.isAuth);
      this.isAuth=false;
    this.router.navigate(['/auth','signin']);
  }

  

  public getUser(username: string,password: string) :Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/find/${username}&${password}`);
  }
  

 
}

 
