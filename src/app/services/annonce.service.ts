 
import { AnnonceInetrne } from 'src/app/models/annonceInterne';
 
 
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AnnonceExterne  } from "../models/annonceExterne";
 
 

@Injectable({providedIn: 'root'})
export class AnnonceService{

  updateEtatsAnnonceInterne(idAnnonce: number) : Observable<AnnonceInetrne> {
    return this.http.put<AnnonceInetrne>(`${this.apiServerUrl}/annonceinterne/updateetats`,idAnnonce);
  }
  updateEtatsAnnonceExtern(idAnnonce: number) : Observable<AnnonceExterne> {
    return this.http.put<AnnonceExterne>(`${this.apiServerUrl}/annonceexterne/updateetats`,idAnnonce);
  }
  isAnnoncedExterne(id: number):Observable<boolean> {
    return this.http.get<boolean>(`${this.apiServerUrl}/annonceexterne/isExist${id}`);
  }
  isAnnoncedInterne(id: number):Observable<boolean> {
    return this.http.get<boolean>(`${this.apiServerUrl}/annonceinterne/isExist${id}`);
  }

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getAllEx(): Observable<AnnonceExterne[]> {
        return this.http.get<AnnonceExterne[]>(`${this.apiServerUrl}/annonceexterne/all`);
      }
      
      public getAnnonceExterne(id :number): Observable<AnnonceExterne[]> {
          return this.http.get<AnnonceExterne[]>(`${this.apiServerUrl}/annonceexterne/find${id}`);
        }
        
      public addAnnoncExterne(newannonce :any): Observable<AnnonceExterne> {
        return this.http.post<AnnonceExterne>(`${this.apiServerUrl}/annonceexterne/add`,newannonce);
      }
      
      public updateAnnonceExterne(annonce : any): Observable<AnnonceExterne> {
        return this.http.put<AnnonceExterne>(`${this.apiServerUrl}/annonceexterne/update`, annonce);
      }
      
      public deleteAnnonceExene(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/annonceexterne/delete/${id}`);
      }
      

      public getAllIn(): Observable<AnnonceInetrne[]> {
        return this.http.get<AnnonceInetrne[]>(`${this.apiServerUrl}/annonceinterne/all`);
      }
      
      public getAnnonceInterne(id :number): Observable<AnnonceInetrne[]> {
          return this.http.get<AnnonceInetrne[]>(`${this.apiServerUrl}/annonceinterne/find${id}`);
        }
        
      public addAnnoncInterne(newannonce :any): Observable<AnnonceInetrne> {
        return this.http.post<AnnonceInetrne>(`${this.apiServerUrl}/annonceinterne/add`,newannonce);
      }
      
      public updateAnnonceInterne(annonce : any): Observable<AnnonceInetrne> {
        return this.http.put<AnnonceInetrne>(`${this.apiServerUrl}/annonceinterne/update`, annonce);
      }
      
      public deleteAnnonceInterne(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/annonceinterne/delete/${id}`);
      }
      
}