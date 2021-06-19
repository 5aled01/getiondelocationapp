import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Etage } from "../models/etage";

@Injectable({providedIn: 'root'})
export class EtageService{

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getEtagesAll(): Observable<Etage[]> {
        return this.http.get<Etage[]>(`${this.apiServerUrl}/etage/all`);
      }
      
      public getEtages(id :number): Observable<Etage[]> {
          return this.http.get<Etage[]>(`${this.apiServerUrl}/etage/find/${id}`);
        }
        
  
      public addEtage(newEtage :any): Observable<Etage> {
        return this.http.post<Etage>(`${this.apiServerUrl}/etage/add`,newEtage);
      }
      
      public updateEtage(etage : any): Observable<Etage> {
        return this.http.put<Etage>(`${this.apiServerUrl}/etage/update`, etage);
      }
      
      public deleteEtage(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/etage/delete/${id}`);
      }
      

}