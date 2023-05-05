import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../userService.service';
import { StatusUpdate } from './slot.model';
import { DoctorSlotServiceService } from './doctorSlotService.service';

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.css']
})
export class SlotComponent implements OnInit {

  constructor(private http:HttpClient,private service:UserServiceService, private doctorSlot:DoctorSlotServiceService) { }
  // status:any=this.service.viewStatus;
  slotAllocated:any=""
  treatmentStatus:StatusUpdate=new StatusUpdate();

  ngOnInit() {
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
    details.isDisabled=true;

    // this.status=true;
  }
}
