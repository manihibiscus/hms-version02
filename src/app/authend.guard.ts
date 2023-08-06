import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './Login.service';

@Injectable({
  providedIn: 'root'
})

export class AuthendGuard implements CanActivate, CanActivateChild {
  constructor(private service:LoginService, private router:Router){ }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    console.log("can activate hild")
  if(!this.service.isAdminUser()){
  alert("You are not admin and not allowed to edit the product");
  return false;
}
return true;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{

if(!this.service.isUserLoggedIn()){
  alert("You are not logged in to view the page");
  this.router.navigate(["login"],{queryParams:{retUrl:route.url}});
  //localhost:4200/login?retUrl=product
  return false;
  }
    return true;
  }
}
