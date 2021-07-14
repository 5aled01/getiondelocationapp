import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client';
import { ProC2 } from '../models/proc2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-principale',
  templateUrl: './principale.component.html',
  styleUrls: ['./principale.component.css']
})
export class PrincipaleComponent implements OnInit {
  ProConnect!: ProC2;
  isAuth!: boolean ;

  private apiServerUrl = environment.apiBaseUrl ;
  clientconncte! : Client;
  public type!: string;

  constructor(private router: Router,public authservice : AuthService,private http: HttpClient,private sanitizer: DomSanitizer) { 
    this.ProConnect = authservice.ProConnect;
    this.router.events.subscribe(event =>{
      if(localStorage.getItem('isAuthp') == 'true'){
        this.isAuth = true;
    }
     else{ 
           this.isAuth = false;
      } 
      if(localStorage.getItem('isAuthc') == 'true'){
        this.isAuth = true;
    }
      else{ 
        this.isAuth = false;
      } 
      this.type = localStorage.getItem('type');
    }
    )
  }

  ngOnInit(): void {
 
      if(localStorage.getItem('isAuthp') == 'true'){
        this.isAuth = true;
    }
     
      if(localStorage.getItem('isAuthc') == 'true'){
        this.isAuth = true;
    }
      
      this.type = localStorage.getItem('type');
   
    if(this.isAuth){
      
      if(this.type == 'client')
        this.signInClient(localStorage.getItem('authnom') ,localStorage.getItem('password'));
      else
       this.signInProC2(localStorage.getItem('proname') ,localStorage.getItem('password'));  
       
      }}

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


    onSignOut() {
      this.isAuth=false;
      this.authservice.signOutClient();
     }


    signInClient(username: string, password: string) { 
      return new Promise <void>((response, reject) => {
        this.http.get<Client>(`${this.apiServerUrl}/client/find/${username}&${password}`)
          .toPromise()
          .then(
            (response: Client) => {  
              this.clientconncte = response;
            },
            (error) => {
              reject(error.message);
              
            }
          );
      });
      
    }
    
public getImage(image:any){
    
    const base64Data = image
    const retrievedImage = 'data:image/jpeg;base64,' + base64Data;
  //  console.log(retrievedImage);
    return retrievedImage;
  }

}
