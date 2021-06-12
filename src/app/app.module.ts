 

import { UserService } from './services/user.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
 import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import {SigninComponent} from './auth/signin/signin.component';
import { MenuComponent } from './menu/menu.component';
import { UsersComponent } from './menu/users/users.component';
import { HomeComponent } from './menu/home/home.component';
import { ProprietairesComponent } from './menu/proprietaires/proprietaires.component';

import { ProrietaireService } from './services/proprietaire.service';
import { ImmobilierBatiComponent } from './menu/immobilierBati/immobilierBati.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    MenuComponent,
    UsersComponent,
    HomeComponent,
    ProprietairesComponent,
    ImmobilierBatiComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
   AuthGuardService,
    AuthService,
    UserService,
    ProrietaireService,
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
