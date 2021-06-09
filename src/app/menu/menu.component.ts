import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Cookie } from 'ng2-cookies';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {

  UserConnect : User | undefined;
   
  constructor(public authservice : AuthService,private sanitizer: DomSanitizer) { 
    this.UserConnect = authservice.userconncte;

    
  }

  ngOnInit() {
    this.UserConnect = this.authservice.userconncte;
  }

  public getImage(image:any){
    
    const base64Data = image
    const retrievedImage = 'data:image/jpeg;base64,' + base64Data;
    console.log(retrievedImage);
    return retrievedImage;
  }

  onSignOut() {
   
   
   this.authservice.signOutUser();
  }


}
