import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientServiceService {

constructor(private http:HttpClient) { }
logoutStatus!:boolean;

cancelUrl:any="http://localhost:3000/cancelledRequest"
acceptUrl:any="http://localhost:3000/billDetails"
searchCancel(phone: any): Observable<any> {
  return this.http.get<any>(this.cancelUrl).pipe(
    map((data) => {
      return data.filter(
        (item:any) =>
          item.cMobileNo === phone
      );
    })
  );
}

searchAccept(phone: any): Observable<any> {
  return this.http.get<any>(this.acceptUrl).pipe(
    map((data) => {
      return data.filter(
        (item:any) =>
          item.mobileNo === phone
      );
    })
  );
}
}
