import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

constructor(private http:HttpClient) { }

postRegDet(body:any){
 return this.http.post(environment.getPatientRegistrationDetails,body)
}

getRegDet(){
  return this.http.get(environment.getPatientRegistrationDetails)
}
}
