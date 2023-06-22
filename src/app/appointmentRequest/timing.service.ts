import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TimingService {


url:any="http://localhost:3000/appointmentDetails";
constructor(private http:HttpClient) { }
searchTiming(date: any,doctorName:any, hour:any): Observable <any>{
  return this.http.get<any>(this.url).pipe(
    map((data) => {
      return data.filter(
        (item:any) =>
          item.doctorName === doctorName && item.appointmentDate === date && item.appoimtmentHour===hour
      );
    })
  );
}
searchTimingBefore(date: any,doctorName:any): Observable <any>{
  return this.http.get<any>(this.url).pipe(
    map((data) => {
      return data.filter(
        (item:any) =>
          item.doctorName === doctorName && item.appointmentDate === date
      );
    })
  );
}

}
