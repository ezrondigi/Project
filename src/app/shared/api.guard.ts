import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ApiGuard implements CanActivate {
  constructor(private authService: ApiService, private router: Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if(this.authService.isAuthenticated()){
      this.router.navigate(['']);
      return false;
    }else{
      return true;
    }
  }
  
}