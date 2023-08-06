import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorDetailsService {
store:any="";
constructor(private http:HttpClient) { }
getGeneralDoctorDetails(){
 return this.http.get(environment.getGeneralDoctorList);
}
getpediatricianList(){
  return this.http.get(environment.getPediatricianList);
}

}
