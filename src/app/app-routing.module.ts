import { ContratLocationComponent } from './menu/contrat-location/contrat-location.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { HomeComponent } from './menu/home/home.component';
import { ImmobilierBatiComponent } from './menu/immobilierBati/immobilierBati.component';

import { MenuComponent } from './menu/menu.component';
import { ProprietairesComponent } from './menu/proprietaires/proprietaires.component';
import { UsersComponent } from './menu/users/users.component';
import { AuthGuardService } from './services/auth-guard.service';

 


const routes : Routes= [

  
  {path :'auth/signin' ,component: SigninComponent},
  {path :'menu' , component: MenuComponent, children:[
    {path :'' ,redirectTo: 'home', pathMatch: 'full'},
    {path :'home'  ,canActivate : [AuthGuardService], component: HomeComponent},
    {path :'users' , component: UsersComponent},
    {path :'proprietaires' , component: ProprietairesComponent},
    {path :'immobilierBati' , component: ImmobilierBatiComponent},
    {path :'contrat' , component: ContratLocationComponent},
  ]},
  { path: '', redirectTo: 'auth/signin', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/signin' }
  

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
