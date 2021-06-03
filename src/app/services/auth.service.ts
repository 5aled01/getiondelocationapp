import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private apiServerUrl = environment.apiBaseUrl ;
  

  isAuth :boolean = false;
  userconncte : User | undefined;
  constructor(private http: HttpClient,private router :Router) { }

  signInUser(username: string, password: string) {
      return new Promise <void>((response, reject) => {
        this.http.get<User>(`${this.apiServerUrl}/user/find/${username}&${password}`)
          .toPromise()
          .then(
            (response: User) => {  
              this.userconncte =  response;
              this.isAuth= true;
              this.router.navigate(['/menu']);
            },
            (error: HttpErrorResponse) => {
              reject(error.message);
            }
          );
      });
      
    }

  

  public getUser(username: string,password: string) :Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/find/${username}&${password}`);
  }
  

 
}

 
