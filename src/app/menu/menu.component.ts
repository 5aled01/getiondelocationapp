import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Cookie } from 'ng2-cookies';
 
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
})
export class MenuComponent implements OnInit {

  UserConnect : User   ;
  iduser! : number ;
  private apiServerUrl = environment.apiBaseUrl ;
  constructor(public authservice : AuthService,private router: Router,private http: HttpClient,private sanitizer: DomSanitizer) { 
    this.UserConnect = authservice.userconncte;/*
    this.router.events.subscribe(event =>{
      if(Cookie.get('isAuth') == 'true'){
        if(Cookie.get('type') != 'user')
           this.router.navigate(['/principale']);
      }
    })
  */    }

  ngOnInit() {

       
    this.signInUser(localStorage.getItem('username') ,localStorage.getItem('password'));
    console.log(this.UserConnect);

    
  }

  signInUser(username: string, password: string) {
    return new Promise <void>((response, reject) => {
      this.http.get<User>(`${this.apiServerUrl}/user/find/${username}&${password}`)
        .toPromise()
        .then(
          (response: User) => {  
            localStorage.setItem('islogin', 'true');
            localStorage.setItem('username', response.username.toString());
            localStorage.setItem('password', password);
            this.UserConnect = response;
          },
          (error: HttpErrorResponse) => {
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

  onSignOut() {
   this.authservice.signOutUser();
  }


}
