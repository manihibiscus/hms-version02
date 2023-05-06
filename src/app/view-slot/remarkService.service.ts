import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RemarkServiceService {

  baseUrl:any="http://localhost:3000";
constructor(private http:HttpClient) { }

updateRemark(details:any, id:any){
  return this.http.patch(`${this.baseUrl}/patientRegistration/${id}`, details)
}

}
