import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ImmobilierBati } from '../models/ImmobilierBati';

@Injectable({providedIn: 'root'})
export class ImmobilierBatiService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getImmobilierBatis(): Observable<ImmobilierBati[]> {
    return this.http.get<ImmobilierBati[]>(`${this.apiServerUrl}/immobilierbati/all`);
  }

  
  public addImmobilierBati(newimmobilierBati :ImmobilierBati): Observable<ImmobilierBati> {
    return this.http.post<ImmobilierBati>(`${this.apiServerUrl}/immobilierbati/add`,newimmobilierBati);
  }
  
  public updateImmobilierBati(data : any): Observable<ImmobilierBati> {
    return this.http.put<ImmobilierBati>(`${this.apiServerUrl}/immobilierbati/update`, data);
  }
   
  public deleteImmobilierBati(ImmobilierBatiId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/immobilierbati/delete/${ImmobilierBatiId}`);
  }


}
