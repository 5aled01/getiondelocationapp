import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { MenuComponent } from './menu/menu.component';
import { AuthGuardService1 } from './services/atuh-gard1.service';
import { AuthGuardService } from './services/auth-guard.service';
 


const routes : Routes= [
  
  {path :'auth/signin'  ,component: SigninComponent},
  {path :'menu' ,canActivate: [AuthGuardService], component: MenuComponent},
   
  

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
