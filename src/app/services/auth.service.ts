import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Cookie } from 'ng2-cookies';
import { ProC2 } from '../models/proc2';
import { Client } from '../models/client';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
 

  

  
    private apiServerUrl = environment.apiBaseUrl ;
    isAuth: boolean = false;
     
    public userconncte!:  User;
  
 
  idc: number | undefined;
  ProConnect! : ProC2;
  clientconncte!: Client;
 
  constructor(private http: HttpClient,private router :Router) {
    
   }

   ngOnInit() {
    
}
   
  


   signInProC2(pronom: string, password: string) {
    return new Promise <void>((response, reject) => {
      this.http.get<ProC2>(`${this.apiServerUrl}/proc2/find/${pronom}&${password}`)
        .toPromise()
        .then(
          (response: ProC2) => {  
            Cookie.set('username', response.pronom.toString());
            Cookie.set('password', password);
            Cookie.set('isAuth', 'true');
            
            Cookie.set('type', 'proc1');
            this.isAuth = true;
            this.ProConnect = response;
            this.router.navigate(['/principale','profile',response.id]);
          },
          (error) => {
            reject(error.message);
          }
        );
    });
    
  }

  signOutProC2() {
    Cookie.set('isAuth', 'false');
    Cookie.set('username', '');
    Cookie.set('password', '');
    Cookie.set('type', '');
    this.isAuth=false;
    this.router.navigate(['/principale','auth','signin']);
}

public getProC2(pronom: string,password: string) :Observable<ProC2> {
  return this.http.get<ProC2>(`${this.apiServerUrl}/proc2/find/${pronom}&${password}`);
}

public addProC2(formdata :any): Observable<ProC2> {
  return this.http.post<ProC2>(`${this.apiServerUrl}/proc2/add`,formdata);
}

public addClient(uploadImage: any): Observable<Client> {
  console.log(uploadImage);
  return this.http.post<Client>(`${this.apiServerUrl}/client/add`,uploadImage);
}

  
 
  

  signInUser(username: string, password: string) {
      return new Promise <void>((response, reject) => {
        this.http.get<User>(`${this.apiServerUrl}/user/find/${username}&${password}`)
          .toPromise()
          .then(
            (response: User) => {  
              Cookie.set('isAuth', 'true');
              Cookie.set('type', 'user');
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

    signInClient(username: string, password: string) {  console.log('--------');
      return new Promise <void>((response, reject) => {
        this.http.get<Client>(`${this.apiServerUrl}/client/find/${username}&${password}`)
          .toPromise()
          .then(
            (response: Client) => {  
              console.log('--------');
              Cookie.set('isAuth', 'true');
              Cookie.set('type', 'client');
              Cookie.set('nom', response.nom.toString());
              Cookie.set('password', password);
              this.isAuth = true;
              this.clientconncte = response;
              this.router.navigate(['/principale']);
            },
            (error: HttpErrorResponse) => {
              reject(error.message);
              
            }
          );
      });
      
    }

    signOutUser() {
      Cookie.set('isAuth', 'false');
      Cookie.set('username', '');
      Cookie.set('password', '');
      Cookie.set('type', '');
      console.log(this.isAuth);
      this.isAuth=false;
    this.router.navigate(['/auth','signin']);
  }


  signOutClient() {
    Cookie.set('isAuth', 'false');
    Cookie.set('nom', '');
    Cookie.set('password', '');
    Cookie.set('type', '');
    console.log(this.isAuth);
    this.isAuth=false;
  this.router.navigate(['/auth','signin']);
}

  

  public getUser(username: string,password: string) :Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/find/${username}&${password}`);
  }
  

 
}

 
