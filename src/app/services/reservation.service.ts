import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
 
import { Reservation } from "../models/reservation";

@Injectable({providedIn: 'root'})
export class ReservationService{

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getReservationAll(): Observable<Reservation[]> {
        return this.http.get<Reservation[]>(`${this.apiServerUrl}/reservation/all`);
      }
      public getReservationIntern(): Observable<Reservation[]> {
        return this.http.get<Reservation[]>(`${this.apiServerUrl}/reservation/interne`);
      }
      public getReservations(id :number): Observable<Reservation[]> {
          return this.http.get<Reservation[]>(`${this.apiServerUrl}/reservation/find/${id}`);
        }
        
  
      public addReservation(newEtage :any): Observable<Reservation> {
        return this.http.post<Reservation>(`${this.apiServerUrl}/reservation/add`,newEtage);
      }
      
      public updateReservation(etage : any): Observable<Reservation> {
        return this.http.put<Reservation>(`${this.apiServerUrl}/reservation/update`, etage);
      }
      
      public deleteReservation(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/reservation/delete/${id}`);
      }
      

}