import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TimingService {


url:any=environment.getAppointmentDetails;
constructor(private http:HttpClient) { }

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
