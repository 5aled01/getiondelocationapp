import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Cookie } from 'ng2-cookies';
 
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {

  UserConnect : User   ;
  iduser : number ;
  private apiServerUrl = environment.apiBaseUrl ;
  constructor(public authservice : AuthService,private http: HttpClient,private sanitizer: DomSanitizer) { 
    this.UserConnect = authservice.userconncte;

    
  }

  ngOnInit() {
    this.signInUser(Cookie.get('username') ,Cookie.get('password'));
    console.log(this.UserConnect);
  }

  signInUser(username: string, password: string) {
    return new Promise <void>((response, reject) => {
      this.http.get<User>(`${this.apiServerUrl}/user/find/${username}&${password}`)
        .toPromise()
        .then(
          (response: User) => {  
            Cookie.set('islogin', 'true');
            Cookie.set('username', response.username.toString());
            Cookie.set('password', password);
           
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
