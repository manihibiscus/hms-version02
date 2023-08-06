import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PatientRegistrationComponent } from './patientRegistration/patientRegistration.component';

export interface IDeactivateComponent{
  canExit:()=>Observable<boolean> | Promise<boolean> |boolean;
}
@Injectable({
  providedIn: 'root'
})

export class ConformationGuard implements  CanDeactivate<IDeactivateComponent> {

  canDeactivate(
    component: IDeactivateComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot) {

      return component.canExit();
  }

}
