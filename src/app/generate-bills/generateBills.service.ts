import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenerateBillsService {
baseUrl:any="http://localhost:3000";
constructor(private http:HttpClient) { }
getAcceptRequest(){
  return this.http.get<any>("http://localhost:3000/acceptRequest");
}
postBillDetails(body:any){
  return this.http.post<any>("http://localhost:3000/billDetails",body);
}
deleteGeneratedBills(id:any){
  return this.http.delete(`${this.baseUrl}/acceptRequest/${id}`);
}
getBillDetails(){
  return this.http.get("http://localhost:3000/billDetails");
}
updatePatientRegistration(details:any, id:any){
  return this.http.patch(`${this.baseUrl}/patientRegistration/${id}`, details)
}
}
