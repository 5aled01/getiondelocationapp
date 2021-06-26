import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { environment } from 'src/environments/environment';
import { ProC2 } from '../models/proc2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-principale',
  templateUrl: './principale.component.html',
  styleUrls: ['./principale.component.css']
})
export class PrincipaleComponent implements OnInit {
  ProConnect!: ProC2;
  isAuth: boolean = true;

  private apiServerUrl = environment.apiBaseUrl ;

  constructor(private router: Router,public authservice : AuthService,private http: HttpClient,private sanitizer: DomSanitizer) { 
    this.ProConnect = authservice.ProConnect;
    this.router.events.subscribe(event =>{
      if(Cookie.get('isAuth') == 'true'){
        this.isAuth = true;
        this.signInProC2(Cookie.get('username') ,Cookie.get('password'));
      }

      if(Cookie.get('isAuth') == 'false'){
        this.isAuth = false;
      } 
    }
    )
  }

  ngOnInit(): void {
    if(this.isAuth)
    this.signInProC2(Cookie.get('username') ,Cookie.get('password'));
  }

  signInProC2(pronom: string, password: string) {
    return new Promise <void>((response, reject) => {
      this.http.get<ProC2>(`${this.apiServerUrl}/proc2/find/${pronom}&${password}`)
        .toPromise()
        .then(
          (response: ProC2) => {  
            
            this.ProConnect = response;
          },
          (error) => {
            reject(error.message);
          }
        );
    });}
    
public getImage(image:any){
    
    const base64Data = image
    const retrievedImage = 'data:image/jpeg;base64,' + base64Data;
  //  console.log(retrievedImage);
    return retrievedImage;
  }

}
