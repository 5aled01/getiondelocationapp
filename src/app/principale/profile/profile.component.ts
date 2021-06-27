import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { ProC2 } from 'src/app/models/proc2';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private apiServerUrl = environment.apiBaseUrl ;
  ProC2Connect!: ProC2;
  constructor(private router: Router,public authservice : AuthService,private http: HttpClient) { }

  
  ngOnInit(): void {
    this.signInProC2(Cookie.get('username') ,Cookie.get('password'));
  
  }

  signInProC2(pronom: string, password: string) {
    return new Promise <void>((response, reject) => {
      this.http.get<ProC2>(`${this.apiServerUrl}/proc2/find/${pronom}&${password}`)
        .toPromise()
        .then(
          (response: ProC2) => {  
            
            this.ProC2Connect = response;
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

  onSignOut() {
    this.authservice.signOutProC2();
   }

}
