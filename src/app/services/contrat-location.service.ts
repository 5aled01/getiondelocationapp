import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContratLocation } from '../models/contratLocation';
import { ProC1 } from '../models/proc1';

@Injectable({
  providedIn: 'root'
})
export class ContratLocationService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getProprietaire(id :number): Observable<ProC1> {
    
    return this.http.get<ProC1>(`${this.apiServerUrl}/proc1/find/${id}`);

   }
   public getProprietaires(): Observable<ProC1[]> {
    return this.http.get<ProC1[]>(`${this.apiServerUrl}/proc1/all`);
  }
  
  public getContratLocations(): Observable<ContratLocation[]> {
    return this.http.get<ContratLocation[]>(`${this.apiServerUrl}/contratlocation/all`);
  }
  public getContratLocationsNonAnnonced(): Observable<ContratLocation[]> {
    return this.http.get<ContratLocation[]>(`${this.apiServerUrl}/contratlocation/allNonAnnonced`);
  }
  public getContratLocation(id : number): Observable<ContratLocation> {
    return this.http.get<ContratLocation>(`${this.apiServerUrl}/contratlocation/find/${id}`);
  }
  
  public addContratLocation( formdata :any): Observable<ContratLocation > {
    return this.http.post<ContratLocation>(`${this.apiServerUrl}/contratlocation/add`,formdata);
  }

 
  public updateContratLocation(data : any): Observable<ContratLocation> {
    return this.http.put<ContratLocation>(`${this.apiServerUrl}/contratlocation/update`, data);
  }
   
  public deleteContratLocation( Id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/contratlocation/delete/${Id}`);
  }
}
