import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterComponent } from './Register/Register.component';

export interface InterDeactivate{
  canExit:()=>boolean;
}
export class DeactivateGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: InterDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot):  boolean {
    return component.canExit?component.canExit():false;;
  }
}
