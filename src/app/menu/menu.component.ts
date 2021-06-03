import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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

  
  ngOnInit(): void {
  
  }
  geturl(){
    let TYPED_ARRAY = new Uint8Array(this.UserConnect?.image);
    const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);

    let base64String = btoa(STRING_CHAR);

    this.imageurl = this..domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String);
  }
  
  


}
