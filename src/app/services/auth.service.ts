import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private apiServerUrl = environment.apiBaseUrl ;
  currentUserValue: any;

  isAuth :boolean = false;

  constructor(private http: HttpClient) { }

  signInUser(username: string, password: string) {
      return new Promise<void>((resolve, reject) => {
        this.http.get<User>(`${this.apiServerUrl}/user/find/${username}&${password}`)
          .toPromise()
          .then(
            res => {  
              resolve();
            },
            (error) => {
              reject(error);
            }
          );
      });
      
    }

  

  public getUser(username: string,password: string){
    return this.http.get<User>(`${this.apiServerUrl}/user/find/${username}&${password}`);
  }
  

 
}

 
