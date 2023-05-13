import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminPage',
  templateUrl: './adminPage.component.html',
  styleUrls: ['./adminPage.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(private http:HttpClient) { }
  registeredCount:any=""
  appointmentCount:any=""
  status:boolean=false
  ngOnInit() {
      this.http.get<any>("http://localhost:3000/patientRegistration").subscribe(data=>{
        this.registeredCount=data
      });
      this.http.get<any>("http://localhost:3000/appointmentDetails").subscribe(value=>{
        this.appointmentCount=value
      });
      this.http.get<any>("http://localhost:3000/appointmentDetails").subscribe(value=>{
        this.appointmentCount=value
      });

  }
  editField: string | number = '';

  show(){
    this.status=true;
  }
  edit(patient:any){
    patient.isEdit=true
  }
  deleted(patient:any){

  }


}
