import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { MenuComponent } from './menu/menu.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes : Routes= [
  
  {path :'auth/signin' ,component: SigninComponent},
  {path :'menu' ,canActivate: [AuthGuardService], component: MenuComponent},
  { path: '', pathMatch: 'full', redirectTo: 'auth/signin'},
  { path: '**', redirectTo: 'auth/signin' }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
