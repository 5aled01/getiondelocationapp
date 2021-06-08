import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({providedIn: 'root'})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/user/all`);
  }

  
  public addUser( formdata :any): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/user/add`,formdata);
  }

  public updateUserWithimg(data : any): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/user/updatewithimg`, data);
  }
  public updateUser(data : any): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/user/update`, data);
  }
   
  public deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/user/delete/${userId}`);
  }
}
