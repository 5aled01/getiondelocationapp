import { ReservationComponent } from './menu/reservation/reservation.component';
import { Reservation } from 'src/app/models/reservation';
  
 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { ImmobilierBatiComponent } from './menu/immobilierBati/immobilierBati.component';

import { MenuComponent } from './menu/menu.component'; 
import { ProprietairesComponent } from './menu/proprietaires/proprietaires.component';
import { SingleImmoblierBatiComponent } from './menu/single-immoblier-bati/single-immoblier-bati.component';
import { UsersComponent } from './menu/users/users.component';
import { HomeComponent } from './menu/home/home.component';
import { AnnonceComponent } from './menu/annonce/annonce.component';
import { ContratLocationComponent } from './menu/contrat-location/contrat-location.component';
import { ClientComponent } from './menu/client/client.component';
 
 
const routes : Routes= [
 
  {path :'auth/signin'  ,component: SigninComponent},
  {path :'menu' , component: MenuComponent, children:[
    {path :'' ,redirectTo: 'home', pathMatch: 'full'},
    {path :'home' , component: HomeComponent},
    {path :'users' , component: UsersComponent},
    {path :'proprietaires' , component: ProprietairesComponent},
    {path :'detail' , component: SingleImmoblierBatiComponent},
    {path :'annonce' , component: AnnonceComponent},
    {path :'contrat' , component: ContratLocationComponent},
    {path :'client',component:ClientComponent},

    {path :'reservation',component:ReservationComponent},
    {path :'immobilierBati' , component: ImmobilierBatiComponent},
    {path :'detail/:id' , component: SingleImmoblierBatiComponent}
  ]},
  { path: '', redirectTo: 'auth/signin', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/signin' }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
