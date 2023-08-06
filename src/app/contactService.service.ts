import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {

  queryUrl:any=environment.getQueryDetails;
constructor(private http:HttpClient) { }

postQueryDetails(body:any){
  return this.http.post(this.queryUrl,body);
}

getQueryDetails(){
  return this.http.get(this.queryUrl);
}

}
