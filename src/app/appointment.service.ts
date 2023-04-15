import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

constructor(private http:HttpClient) { }
storeField:any=""
postAppointmentDetails(body:any){
  return this.http.post("http://localhost:3000/appointmentDetails", body)
}
getAppointmentDetails(){
  return this.http.get("http://localhost:3000/appointmentDetails");
}

}
