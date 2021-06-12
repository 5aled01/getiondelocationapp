import { Injectable } from '@angular/core';
import { ProC2 } from 'src/app/models/proc2';
import { ProC1 } from 'src/app/models/proc1';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class ProrietaireService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getProC1s(): Observable<ProC1[]> {
    return this.http.get<ProC1[]>(`${this.apiServerUrl}/proc1/all`);
  }

  
  public addProC1( formdata :any): Observable<ProC1> {
    return this.http.post<ProC1>(`${this.apiServerUrl}/proc1/add`,formdata);
  }

  public updateProC1Withimg(data : any): Observable<ProC1> {
    return this.http.put<ProC1>(`${this.apiServerUrl}/proc1/updatewithimg`, data);
  }
  public updateProC1(data : any): Observable<ProC1> {
    return this.http.put<ProC1>(`${this.apiServerUrl}/proc1/update`, data);
  }
   
  public deleteProC1(ProC1Id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/proc1/delete/${ProC1Id}`);
  }



  public getProC2s(): Observable<ProC2[]> {
    return this.http.get<ProC2[]>(`${this.apiServerUrl}/proc2/all`);
  }

  
  public addProC2( formdata :any): Observable<ProC2> {
    return this.http.post<ProC1>(`${this.apiServerUrl}/proc2/add`,formdata);
  }

  public updateProC2Withimg(data : any): Observable<ProC2> {
    return this.http.put<ProC2>(`${this.apiServerUrl}/proc2/updatewithimg`, data);
  }
  public updateProC2(data : any): Observable<ProC2> {
    return this.http.put<ProC2>(`${this.apiServerUrl}/proc2/update`, data);
  }
   
  public deleteProC2(ProC1Id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/proc2/delete/${ProC1Id}`);
  }
}