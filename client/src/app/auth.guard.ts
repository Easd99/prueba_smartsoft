import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService  } from './service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService:AuthService,
    private router: Router,
  ){}


  canActivate(): boolean{
    if(this.authService.verifytoken()){
      return true
    }

    this.router.navigate(['/signin'])
    return false
  } 
  
}
