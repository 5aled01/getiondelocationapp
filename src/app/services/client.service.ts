import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Client } from "../models/client";
import { Etage } from "../models/etage";

@Injectable({providedIn: 'root'})
export class ClientService{

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getClients(): Observable<Client[]> {
        return this.http.get<Client[]>(`${this.apiServerUrl}/client/all`);
      }
    
        
  
      public addClient(newClient :any): Observable<Client> {
        return this.http.post<Client>(`${this.apiServerUrl}/client/add`,newClient);
      }
      
      public updateClient(etage : any): Observable<Client> {
        return this.http.put<Client>(`${this.apiServerUrl}/client/update`, etage);
      }
      public updateClientwithimg(client : any): Observable<Client> {
        return this.http.put<Client>(`${this.apiServerUrl}/client/updatewithimg`,client);
      }
      
      public deleteClient(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/client/delete/${id}`);
      }
      

}