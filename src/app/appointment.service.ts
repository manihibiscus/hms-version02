import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
baseUrl:any=environment.getUrl;
constructor(private http:HttpClient) { }
storeField:any=""
postAppointmentDetails(body:any){
  return this.http.post(environment.getAppointmentDetails, body)
}
getAppointmentDetails(){
  return this.http.get(environment.getAppointmentDetails);
}
deleteAppointment(id: number){
  return this.http.delete(`${environment.getAppointmentDetails}${id}`);
}
acceptDeleteAppointment(acceptId: number){
  return this.http.delete(`${environment.getAppointmentDetails}${acceptId}`);
}
updateAppointmentStatus(details:any, id:any){
  return this.http.patch(`${environment.getPatientRegistrationDetails}${id}`,details);
}
}
