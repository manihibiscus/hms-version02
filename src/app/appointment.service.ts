import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
baseUrl:any="http://localhost:3000";
constructor(private http:HttpClient) { }
storeField:any=""
postAppointmentDetails(body:any){
  return this.http.post("http://localhost:3000/appointmentDetails", body)
}
getAppointmentDetails(){
  return this.http.get("http://localhost:3000/appointmentDetails");
}
deleteAppointment(id: number){
  return this.http.delete(`${this.baseUrl}/appointmentDetails/${id}`);
}
acceptDeleteAppointment(acceptId: number){
  return this.http.delete(`${this.baseUrl}/appointmentDetails/${acceptId}`);
}
updateAppointmentStatus(details:any, id:any){
  return this.http.patch(`${this.baseUrl}/patientRegistration/${id}`,details);
}
}
