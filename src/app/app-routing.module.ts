import { SingleAnnonceComponent } from './principale/single-annonce/single-annonce.component';
import { ReservationComponent } from './menu/reservation/reservation.component';
import { Reservation } from 'src/app/models/reservation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './principale/auth/signin/signin.component';
import { ImmobilierBatiComponent } from './menu/immobilierBati/immobilierBati.component';
import { MenuComponent } from './menu/menu.component'; 
import { ProprietairesComponent } from './menu/proprietaires/proprietaires.component';
import { SingleImmoblierBatiComponent } from './menu/single-immoblier-bati/single-immoblier-bati.component';
import { UsersComponent } from './menu/users/users.component';
import { HomeComponent } from './menu/home/home.component';
import { AnnonceComponent } from './menu/annonce/annonce.component';
import { ContratLocationComponent } from './menu/contrat-location/contrat-location.component';
import { ClientComponent } from './menu/client/client.component';
import { PrincipaleComponent } from './principale/principale.component';
import { SignupComponent } from './principale/auth/signup/signup.component';
import { ProfileComponent } from './principale/profile/profile.component';
import { AnnonceListComponent } from './principale/annonce-list/annonce-list.component';
import { AuthGuardService } from './services/auth-guard.service';
import { MenuGuardService } from './services/menu-guad.service';

 
 
const routes : Routes= [
 
  {path :'principale'  ,component: PrincipaleComponent,children:[
 
    {path :'annonce-list' , component: AnnonceListComponent},
    {path :'auth/signin' , component: SigninComponent},
    {path :'auth/signin/:sms' , component: SigninComponent},
    {path :'auth/signup' , component: SignupComponent},
    {path :'profile/:id' ,canActivate:[AuthGuardService] ,component: ProfileComponent},
    {path :'singleannonce/:idImmobilier/:idAnnonce/:typeAnnonce'  ,component: SingleAnnonceComponent},
    {path :'' ,redirectTo: 'annonce-list', pathMatch: 'full'}
  ]},
  {path :'menu' ,canActivate:[MenuGuardService],component: MenuComponent, children:[
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
  { path: '', redirectTo: 'principale', pathMatch: 'full' },
  { path: '**', redirectTo: 'principale' }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
