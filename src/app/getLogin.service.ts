import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetLoginService {

constructor(private http:HttpClient) { }

getAdminDetails(){
  return this.http.get(environment.getAdminId);
}
getDoctorDetails(){
  return this.http.get(environment.getDoctorIdDetails);
}
postForgotPasswordDetails(body:any){
  return this.http.post(environment.getForgotPassDetails, body)
}
}
