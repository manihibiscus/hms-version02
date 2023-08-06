import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenerateBillsService {
baseUrl:any=environment.getUrl;
constructor(private http:HttpClient) { }
getAcceptRequest(){
  return this.http.get<any>(environment.getAcceptRequestDetails);
}
postBillDetails(body:any){
  return this.http.post<any>(environment.getBillDetails,body);
}
deleteGeneratedBills(id:any){
  return this.http.delete(`${environment.getAcceptRequestDetails}${id}`);
}
getBillDetails(){
  return this.http.get(environment.getBillDetails);
}
updatePatientRegistration(details:any, id:any){
  return this.http.patch(`${environment.getPatientRegistrationDetails}${id}`, details)
}
}
