import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AddDetailsService {

constructor(private client:HttpClient) { }

addUserInformation(body:any){
  this.client.post("http://localhost:3000/users", body);
}

}
