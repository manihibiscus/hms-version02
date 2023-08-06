import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../userService.service';
import { StatusUpdate } from './slot.model';
import { DoctorSlotServiceService } from './doctorSlotService.service';
import { Observable, map, subscribeOn } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.css']
})
export class SlotComponent implements OnInit {

  constructor(private http:HttpClient,
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

    this.searchPatient().subscribe((data)=>{
    this.slotAllocated=data;
    });

  }
  searchPatient(): Observable<any> {
    return this.http.get<any>(environment.getAcceptRequestDetails).pipe(
      map((data) => {
        return data.filter(
          (item:any) =>
            item.doctorName === this.loggedInUser.doctorName && item.doctorField === this.loggedInUser.field
        );
      })
    );
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
    this.http.patch<any>(environment.getAcceptRequestDetails+id,body).subscribe(()=>{
    alert("Seneded")
    this.findToPatient(details)

    this.ngOnInit();
    });
    // this.status=true;
  }
  findToPatient(details:any){

    this.http.get<any>(environment.getPatientRegistrationDetails).subscribe((data)=>{
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
    this.http.patch<any>(environment.getPatientRegistrationDetails+id,body).subscribe(()=>{
      alert("Updated to Patient DB");
    })
  }

}
