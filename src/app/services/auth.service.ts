import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Cookie } from 'ng2-cookies';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  
    private apiServerUrl = environment.apiBaseUrl ;
    isAuth: boolean = false;
     
    public userconncte:  User;
  
 
  idc: number | undefined;
 
  constructor(private http: HttpClient,private router :Router) {
    if(Cookie.get('islogin')=='true')
    this.isAuth = true;
   }

  ngOnInit() {
    this.signInUser(Cookie.get('username') ,Cookie.get('password'));
    
    return this.userconncte;
}
 
  

  signInUser(username: string, password: string) {
      return new Promise <void>((response, reject) => {
        this.http.get<User>(`${this.apiServerUrl}/user/find/${username}&${password}`)
          .toPromise()
          .then(
            (response: User) => {  
              Cookie.set('islogin', 'true');
              Cookie.set('username', response.username.toString());
              Cookie.set('password', password);
              this.isAuth = true;
              this.userconncte = response;
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
      Cookie.set('username', '');
      Cookie.set('password', '');
 
      console.log(this.isAuth);
      this.isAuth=false;
    this.router.navigate(['/auth','signin']);
  }

  

  public getUser(username: string,password: string) :Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/find/${username}&${password}`);
  }
  

 
}

 
