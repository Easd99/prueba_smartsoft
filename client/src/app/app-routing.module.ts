import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SigninComponent} from './signin/signin.component'
import {SignupComponent} from './signup/signup.component'
import {MainComponent} from './main/main.component'
import {AuthGuard} from './auth.guard'

const routes: Routes = [
  {path:'', redirectTo: 'signin', pathMatch:'full'},
  {path:'signin', component: SigninComponent},
  {path:'signup', component: SignupComponent},
  {path:'home', component: MainComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [SigninComponent, MainComponent, SignupComponent]
