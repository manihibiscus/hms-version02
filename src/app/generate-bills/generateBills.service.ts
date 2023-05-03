import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenerateBillsService {

constructor(private http:HttpClient) { }
getAcceptRequest(){
  return this.http.get<any>("http://localhost:3000/acceptRequest");
}
postBillDetails(body:any){
  return this.http.post<any>("http://localhost:3000/billDetails",body);
}
}
