import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorDetailsService {
store:any="";
constructor(private http:HttpClient) { }
getGeneralDoctorDetails(){
 return this.http.get("http://localhost:3000/generalDoctorList");
}
getpediatricianList(){
  return this.http.get("http://localhost:3000/pediatricianList");
}

}
