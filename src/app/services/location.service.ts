 
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Location } from "../models/Location";
 
 

@Injectable({providedIn: 'root'})
export class LocationService{

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getLocationAll(): Observable<Location[]> {
        return this.http.get<Location[]>(`${this.apiServerUrl}/location/all`);
      }
    
      public getLocation(id :number): Observable<Location[]> {
          return this.http.get<Location[]>(`${this.apiServerUrl}/location/find/${id}`);
        }
        
  
      public addLocation(newLocation :Location): Observable<Location> {
        return this.http.post<Location>(`${this.apiServerUrl}/location/add`,newLocation);
      }
      
      public updateLocation(reservation : Location): Observable<Location> {
        return this.http.put<Location>(`${this.apiServerUrl}/location/update`, reservation);
      }
     
      public deleteLocation(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/location/delete/${id}`);
      }
      
     
}