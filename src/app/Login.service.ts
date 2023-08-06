import { Injectable } from '@angular/core';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn:boolean=false;
  userName:string="";
  constructor() { }
  login(username:string,password:string){
    this.userName=username;
    this.isLoggedIn=true;
    return of(this.isLoggedIn);
  }

  isUserLoggedIn():boolean{
    return this.isLoggedIn;
  }

  isAdminUser():boolean{
    console.log("un"+this.userName)
    if(this.userName=="admin"){
      return true;
    }
    return false;
  }
  logoutUser():void{
    this.isLoggedIn=false;
  }

  }


