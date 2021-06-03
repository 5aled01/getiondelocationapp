import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';

const appRoute : Routes= [
 

  {path :'homepage' ,component:MenuComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    
    MenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [
    AuthGuardService,
    AuthService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
