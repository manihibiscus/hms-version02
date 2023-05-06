import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentCancelService {

  baseUrl:any="http://localhost:3000";
constructor(private http:HttpClient) { }
postCancelledRequest(value:any){
  return this.http.post("http://localhost:3000/cancelledRequest",value);
}
postAcceptRequest(data:any){
  return this.http.post("http://localhost:3000/acceptRequest",data);
}
postCancelToPatientRegistration(value:any,id:any){
  return this.http.patch(`${this.baseUrl}/patientRegistration/${id}`, value)
}
}
