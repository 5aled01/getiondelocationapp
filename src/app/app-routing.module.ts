<<<<<<< HEAD
import { ContratLocationComponent } from './menu/contrat-location/contrat-location.component';
=======
import { SingleImmoblierBatiComponent } from './menu/single-immoblier-bati/single-immoblier-bati.component';
>>>>>>> parent of 9117ffb (Revert "Revert "08/06/2021"")
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { ImmobilierBatiComponent } from './menu/immobilierBati/immobilierBati.component';

import { MenuComponent } from './menu/menu.component';
<<<<<<< HEAD

 
const routes : Routes= [
  
  {path :'auth/signin' ,component: SigninComponent},
  {path :'menu' , component: MenuComponent, children:[
  
=======
import { ProprietairesComponent } from './menu/proprietaires/proprietaires.component';
import { UsersComponent } from './menu/users/users.component';
 
const routes : Routes= [
 
  {path :'auth/signin'  ,component: SigninComponent},
  {path :'menu' , component: MenuComponent, children:[
    {path :'' ,redirectTo: 'home', pathMatch: 'full'},
    {path :'home' , component: HomeComponent},
    {path :'users' , component: UsersComponent},
    {path :'proprietaires' , component: ProprietairesComponent},
    {path :'detail' , component: SingleImmoblierBatiComponent},
>>>>>>> parent of 9117ffb (Revert "Revert "08/06/2021"")
    {path :'immobilierBati' , component: ImmobilierBatiComponent},
    {path :'contrat' , component: ContratLocationComponent},
  ]},
  { path: '', redirectTo: 'auth/signin', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/signin' }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
