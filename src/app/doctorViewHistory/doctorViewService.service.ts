import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorViewServiceService {

  constructor(private http:HttpClient) { }
  logoutStatus!:boolean;

  cancelUrl:any=environment.getCancelledRequestDetails
  acceptUrl:any=environment.getAcceptRequestDetails

  searchCancel(doctorName: any): Observable<any> {
  return this.http.get<any>(this.cancelUrl).pipe(
    map((data) => {
      return data.filter(
        (item:any) =>
          item.cdoctorName === doctorName
      );
    })
  );
}

searchAccept(doctorName: any): Observable<any> {
  return this.http.get<any>(this.acceptUrl).pipe(
    map((data) => {
      return data.filter(
        (item:any) =>
          item.doctorName === doctorName
      );
    })
  );
}
}
