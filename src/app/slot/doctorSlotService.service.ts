import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorSlotServiceService {
baseUrl:any=environment.getUrl;
constructor(private http:HttpClient) { }

updateAcceptedDetails(details:any,id:any){
  return this.http.patch(`${environment.getAcceptRequestDetails}${id}`,details);
}
}
