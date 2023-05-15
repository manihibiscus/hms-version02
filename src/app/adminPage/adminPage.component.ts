import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../userService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminPage',
  templateUrl: './adminPage.component.html',
  styleUrls: ['./adminPage.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(private http:HttpClient,private userServeice:UserServiceService, private route:Router) { }
  registeredCount:any=""
  appointmentCount:any=""
  queryCount:any=""
  status:boolean=false
  loggedUser:any=""
  ngOnInit() {
    // sessionStorage.setItem('updateUser', JSON.stringify(this.userServeice.loggedInUser));
    let sessionUser = sessionStorage.getItem('loggedInUser'); // <-- retrieve user details from session storage
    if (sessionUser) {
      this.loggedUser = JSON.parse(sessionUser);
      // this.refresh(sessionUser);
    }
    // else if(this.pr.logoutStatus){
    //   this.loggedOff(sessionUser);
    // }
     else if (this.userServeice.loggedInUser !== null) {
      this.loggedUser = this.userServeice.loggedInUser;
    } else {
      alert('You are Loggedout. Login to continue');
      this.route.navigate(['/login']);
    }

      this.http.get<any>("http://localhost:3000/patientRegistration").subscribe(data=>{
        this.registeredCount=data
      });
      this.http.get<any>("http://localhost:3000/appointmentDetails").subscribe(value=>{
        this.appointmentCount=value
      });
      this.http.get<any>("http://localhost:3000/queryDetails").subscribe(data1=>{
        this.queryCount=data1
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
