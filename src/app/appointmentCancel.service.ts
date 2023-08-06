import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentCancelService {

constructor(private http:HttpClient) { }
postCancelledRequest(value:any){
  return this.http.post(environment.getCancelledRequestDetails,value);
}
postAcceptRequest(data:any){
  return this.http.post(environment.getAcceptRequestDetails,data);
}
postCancelToPatientRegistration(value:any,id:any){
  return this.http.patch(`${environment.getPatientRegistrationDetails}${id}`, value)
}
}
