import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentCancelService {

constructor(private http:HttpClient) { }
postCancelledRequest(value:any){
  return this.http.post("http://localhost:3000/cancelledRequest",value);
}
}
