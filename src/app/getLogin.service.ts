import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetLoginService {

constructor(private http:HttpClient) { }
getDetails(){
  return this.http.get("http://localhost:3000/loginDetails");
}
getAdminDetails(){
  return this.http.get("http://localhost:3000/adminDetails");
}
getDoctorDetails(){
  return this.http.get("http://localhost:3000/doctorDetails");
}
postForgotPasswordDetails(body:any){
  return this.http.post("http://localhost:3000/forgotPassDetails", body)
}
}
