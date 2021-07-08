 
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Vente } from "../models/vente";
 
 

@Injectable({providedIn: 'root'})
export class VenteService{

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getVenteAll(): Observable<Vente[]> {
        return this.http.get<Vente[]>(`${this.apiServerUrl}/vente/all`);
      }
    
      public getVente(id :number): Observable<Vente[]> {
          return this.http.get<Vente[]>(`${this.apiServerUrl}/vente/find/${id}`);
        }
        
  
      public addVente(newLocation :Vente): Observable<Vente> {
        return this.http.post<Vente>(`${this.apiServerUrl}/vente/add`,newLocation);
      }
      
      public updateVente(reservation : Vente): Observable<Vente> {
        return this.http.put<Vente>(`${this.apiServerUrl}/vente/update`, reservation);
      }
     
      public deleteVente(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/vente/delete/${id}`);
      }
      
     
}