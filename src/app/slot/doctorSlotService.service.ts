import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorSlotServiceService {
baseUrl:any="http://localhost:3000";
constructor(private http:HttpClient) { }

updateAcceptedDetails(details:any,id:any){
  return this.http.patch(`${this.baseUrl}/acceptRequest/${id}`,details);
}
}
