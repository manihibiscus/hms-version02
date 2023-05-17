import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../userService.service';
import { StatusUpdate } from './slot.model';
import { DoctorSlotServiceService } from './doctorSlotService.service';
import { subscribeOn } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.css']
})
export class SlotComponent implements OnInit {

  constructor(private http:HttpClient,private service:UserServiceService,
    private doctorSlot:DoctorSlotServiceService, private userServeice:UserServiceService,private route:Router) { }
  // status:any=this.service.viewStatus;
  slotAllocated:any=""
  treatmentStatus:StatusUpdate=new StatusUpdate();
  loggedInUser:any=""
  ngOnInit() {
    const sessionUser = sessionStorage.getItem('loggedInUser'); // <-- retrieve user details from session storage
    if (sessionUser) {
      this.loggedInUser = JSON.parse(sessionUser);
    } else if (this.userServeice.loggedInUser !== null) {
      this.loggedInUser = this.userServeice.loggedInUser;
    } else {
      alert('You are Loggedout. Login to continue');
      this.route.navigate(['/login']);
    }
    this.http.get<any>("http://localhost:3000/acceptRequest").subscribe(data=>{
    this.slotAllocated=data;
    });
  }

  value:any="success";
  // status:boolean=false;
  AddToBill(details:any, id:any){
    // this.treatmentStatus.name=details.name;
    // this.treatmentStatus.mobileNo=details.mobileNo;
    // this.treatmentStatus.date=details.date;
    // this.treatmentStatus.timeing=details.timeing;
    // this.treatmentStatus.problem=details.problem;
    // this.treatmentStatus.doctorName=details.doctorName;
    // this.treatmentStatus.doctorField=details.doctorField;
    this.treatmentStatus.acceptanceStatus=this.value;
    this.doctorSlot.updateAcceptedDetails(this.treatmentStatus,id).subscribe(()=>{
      alert("Updated");
    });
    var body={
      reporingStatus:"Reported to admin"
    }
    this.http.patch<any>("http://localhost:3000/acceptRequest/"+id,body).subscribe(()=>{
    alert("Seneded")
    this.findToPatient(details)

    this.ngOnInit();
    });
    // this.status=true;
  }
  findToPatient(details:any){

    this.http.get<any>("http://localhost:3000/patientRegistration").subscribe((data)=>{
      const getId=data.find((a:any)=>{
        return a.phone===details.mobileNo
      });
      if(getId){
        this.patchToPatient(details,getId.id)
      }
    })
  }
  
  patchToPatient(details:any, id:any){
    var body={
      appStatus:"Treatment was Completed",
      // attemptStatus:"false"
    }
    this.http.patch<any>("http://localhost:3000/patientRegistration/"+id,body).subscribe(()=>{
      alert("Updated to Patient DB");
    })
  }
}
