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
  
  }

  onSignOut() {
   
   
   this.authservice.signOutUser();

   console.log(this.authservice.isAuth);
  }


}
