import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

constructor(private http:HttpClient) { }
getDetails(){
  return this.http.get("http://localhost:3000/product");
}
addUserInformation(body:any){
  return this.http.post("http://localhost:3000/users", body);
}
}
