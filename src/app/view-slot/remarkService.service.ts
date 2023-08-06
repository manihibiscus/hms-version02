import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RemarkServiceService {

constructor(private http:HttpClient) { }

updateRemark(details:any, id:any){
  return this.http.patch(`${environment.getPatientRegistrationDetails}${id}`, details)
}

}
