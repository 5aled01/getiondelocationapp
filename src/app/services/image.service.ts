import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Image } from "../models/image";


@Injectable({providedIn: 'root'})
export class ImageService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}
  
    public getImmages(): Observable<Image[]> {
      return this.http.get<Image[]>(`${this.apiServerUrl}/image/all`);
    }
    
    public getImages(id :number): Observable<Image[]> {
        return this.http.get<Image[]>(`${this.apiServerUrl}/image/finds/${id}`);
      }
      

    public addImage(newImage :FormData): Observable<Image> {
      return this.http.post<Image>(`${this.apiServerUrl}/image/add`,newImage);
    }
    
    public updateImage(image : any): Observable<Image> {
      return this.http.put<Image>(`${this.apiServerUrl}/image/update`, image);
    }
    
    public deleteImage(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiServerUrl}/image/delete/${id}`);
    }
    
    
  
    
}