import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

constructor(private http:HttpClient) { }

postRegDet(body:any){
 return this.http.post("http://localhost:3000/patientRegistration",body)
}

getRegDet(){
  return this.http.get("http://localhost:3000/patientRegistration")
}
}
