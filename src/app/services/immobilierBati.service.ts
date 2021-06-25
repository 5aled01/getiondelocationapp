import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ImmobilierBati } from '../models/ImmobilierBati';

@Injectable({providedIn: 'root'})
export class ImmobilierBatiService {

  
  constructor(private http: HttpClient){}

  getSingleImmobilierBatis(id: number) {
    return this.http.get<ImmobilierBati>(`${this.apiServerUrl}/image/add/${id}`);
  }


  getSingleImmobilierImage(id: number) {
    return this.http.get<ImmobilierBati>(`${this.apiServerUrl}/immobilierbati/find/${id}`);
  }

  private apiServerUrl = environment.apiBaseUrl;

 

  public getImmobilierBatis(): Observable<ImmobilierBati[]> {
    return this.http.get<ImmobilierBati[]>(`${this.apiServerUrl}/immobilierbati/all`);
  }
  public getImmobilierBatispc1(): Observable<ImmobilierBati[]> {
    return this.http.get<ImmobilierBati[]>(`${this.apiServerUrl}/immobilierbati/pc1`);
  }
  public getImmobilierBatispc2(): Observable<ImmobilierBati[]> {
    return this.http.get<ImmobilierBati[]>(`${this.apiServerUrl}/immobilierbati/pc2`);
  }
  public getImmobilierBati(id : number): Observable<ImmobilierBati> {
    return this.http.get<ImmobilierBati>(`${this.apiServerUrl}/immobilierbati/find/${id}`);
  }
  
  
  public addImmobilierBati(newimmobilierBati :ImmobilierBati): Observable<ImmobilierBati> {
    return this.http.post<ImmobilierBati>(`${this.apiServerUrl}/immobilierbati/add`,newimmobilierBati);
  }
  
  public updateImmobilierBati(immobilier : ImmobilierBati): Observable<ImmobilierBati> {
    return this.http.put<ImmobilierBati>(`${this.apiServerUrl}/immobilierbati/update`, immobilier);
  }
  
  public deleteImmobilierBati(ImmobilierBatiId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/immobilierbati/delete/${ImmobilierBatiId}`);
  }
  


}
