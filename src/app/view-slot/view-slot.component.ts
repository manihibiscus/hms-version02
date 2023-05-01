import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { AppointmentCancelService } from '../appointmentCancel.service';
import { UserServiceService } from '../userService.service';

@Component({
  selector: 'app-view-slot',
  templateUrl: './view-slot.component.html',
  styleUrls: ['./view-slot.component.css']
})

export class ViewSlotComponent {
  constructor(private http:HttpClient,private userService:UserServiceService, private service:AppointmentService, private cancelService:AppointmentCancelService) { }
  getAppointment:any="";
  acceptedAppointment:any="";
  canceledAppointment:any="";

  ngOnInit() {
    this.http.get<any>("http://localhost:3000/appointmentDetails").subscribe(data=>{
      this.getAppointment=data;
    });

    this.http.get<any>("http://localhost:3000/acceptRequest").subscribe(acceptDate=>{
    this.acceptedAppointment=acceptDate;
  });
  this.http.get<any>("http://localhost:3000/cancelledRequest").subscribe(cancelDate=>{
    this.canceledAppointment=cancelDate;
  });

  }
  date:any=new Date();
  isDisable:any=false;
  // isHiddenAccept:any=false;
  // isDisableCancel:any=false;
  // isHiddenCancel:any=false;
  aName:any=""
  aMobileNo:any=""
  aDate:any=""
  aTime:any=""
  aSay:any=""
  aDoctorName:any=""
  accept(acceptId: number, acceptName: any, acceptMobileNo: any, acceptDate: any,acceptTime: any, acceptSay:any, doctorName:any){
    this.aName=acceptName;
    this.aMobileNo=acceptMobileNo;
    this.aDate=acceptDate;
    this.aTime=acceptTime;
    this.aSay=acceptSay,
    this.aDoctorName=doctorName;
    alert("This slot is conformed");
    this.service.acceptDeleteAppointment(acceptId).subscribe(()=>{
      alert("Accepted"+acceptId);
      this.ngOnInit();
    });
    this.postAcceptDetails();
  }

  cName:any=""
  cMobileNo:any=""
  cDate:any=""
  doctorName:any=""
  cancel(cancelId: number, cancelName: any, cancelMobileNo: any, cancelDate: any, docName:any){
    // this.postCancelDetails(cancelName, cancelMobileNo, cancelDate);
    this.cName=cancelName;
    this.cMobileNo=cancelMobileNo;
    this.cDate=cancelDate;
    this.doctorName=docName;
    // this.postCancelDetails();
    this.service.deleteAppointment(cancelId).subscribe(()=>{
      alert("Cancelled"+cancelId);
      this.ngOnInit();
    });
    this.postCancelDetails();
  }
  postCancelDetails(){
    var body={
          cName:this.cName,
          cMobileNo:this.cMobileNo,
          cDate:this.cDate,
          doctorName:this.doctorName
        }
  this.cancelService.postCancelledRequest(body).subscribe(value=>{
  });
  }

  postAcceptDetails(){
    var acceptBody={
      name:this.aName,
      mobileNo:this.aMobileNo,
      date:this.aDate,
      timeing:this.aTime,
      problem:this.aSay,
      doctorName:this.aDoctorName
    }
    this.cancelService.postAcceptRequest(acceptBody).subscribe(data=>{
    });
  }
}
