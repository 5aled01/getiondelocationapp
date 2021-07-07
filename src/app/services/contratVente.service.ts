import { ContratVente } from './../models/contratVente';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
 
import { ProC1 } from '../models/proc1';
import { Vente } from '../models/vente';

@Injectable({
  providedIn: 'root'
})
export class ContratVenteService {
  getContratVentesNonAnnonced():Observable<ContratVente[]> {
    return this.http.get<ContratVente[]>(`${this.apiServerUrl}/contratvente/allNonAnnonced`);
  }

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getProprietaire(id :number): Observable<ProC1> {
    
    return this.http.get<ProC1>(`${this.apiServerUrl}/proc1/find/${id}`);

   }
   public getProprietaires(): Observable<ProC1[]> {
    return this.http.get<ProC1[]>(`${this.apiServerUrl}/proc1/all`);
  }
  
  public getContratVentes(): Observable<ContratVente[]> {
    return this.http.get<ContratVente[]>(`${this.apiServerUrl}/contratvente/all`);
  }

  public getContratVente(id : number): Observable<ContratVente> {
    return this.http.get<ContratVente>(`${this.apiServerUrl}/contratvente/find/${id}`);
  }
  
  public addContratVente( formdata :any): Observable<ContratVente > {
    return this.http.post<ContratVente>(`${this.apiServerUrl}/contratvente/add`,formdata);
  }

 
  public updateContratVente(data : any): Observable<ContratVente> {
    return this.http.put<ContratVente>(`${this.apiServerUrl}/contratvente/update`, data);
  }
   
  public deleteContratVente( Id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/contratvente/delete/${Id}`);
  }
}
