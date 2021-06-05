import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { HomeComponent } from './menu/home/home.component';
import { MenuComponent } from './menu/menu.component';
import { UsersComponent } from './menu/users/users.component';
import { AuthGuardService } from './services/auth-guard.service';

 


const routes : Routes= [
  
  {path :'auth/signin'  ,component: SigninComponent},
  {path :'menu' ,canActivate: [AuthGuardService], component: MenuComponent, children:[
    {path :'' ,redirectTo: 'home', pathMatch: 'full'},
    {path :'home' ,canActivate: [AuthGuardService], component: HomeComponent},
    {path :'users' ,canActivate: [AuthGuardService], component: UsersComponent},
  ]},
  { path: '', redirectTo: 'auth/signin', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/signin' }
  

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
