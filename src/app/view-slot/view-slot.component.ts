import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { AppointmentCancelService } from '../appointmentCancel.service';
import { UserServiceService } from '../userService.service';
import { FormBuilder, Validators } from '@angular/forms';
import { RemarkServiceService } from './remarkService.service';
import { PatientPageComponent } from '../patientPage/patientPage.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-slot',
  templateUrl: './view-slot.component.html',
  styleUrls: ['./view-slot.component.css']
})

export class ViewSlotComponent {
  constructor(private http:HttpClient,
    private userService:UserServiceService,
    private service:AppointmentService,
    private cancelService:AppointmentCancelService,
    private fb:FormBuilder,
    private remark:RemarkServiceService,
    private userServeice:UserServiceService,
    private route:Router
    ) { }
  getAppointment:any="";
  acceptedAppointment:any="";
  canceledAppointment:any="";
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
  aDoctorField:any=""
  accept(acceptId: number, acceptName: any, acceptMobileNo: any,
        acceptDate: any,acceptTime: any, acceptSay:any, doctorName:any, doctorField: any){
    this.aName=acceptName;
    this.aMobileNo=acceptMobileNo;
    this.aDate=acceptDate;
    this.aTime=acceptTime;
    this.aSay=acceptSay;
    this.aDoctorName=doctorName;
    this.aDoctorField=doctorField;
    // alert("This slot is conformed");
    this.service.acceptDeleteAppointment(acceptId).subscribe(()=>{
      // alert("Accepted"+acceptId);
      this.ngOnInit();
    });
    this.acceptToPatient(acceptMobileNo);
    this.postAcceptDetails();
  }
  appStatus:any="Accepted for appointment"
  acceptToPatient(acceptMobileNo:any){
    this.http.get<any>("http://localhost:3000/patientRegistration").subscribe(value=>{
      const patient=value.find((a:any)=>{
        return a.phone===acceptMobileNo
    });
    var body={
      appStatus:this.appStatus
    }
    if(patient){
      this.http.patch<any>("http://localhost:3000/patientRegistration/"+patient.id,body).subscribe(data=>{
        alert("Updated to Patient DB");
      })
    }
  })
}

  cName:any=""
  cMobileNo:any=""
  cDate:any=""
  cdoctorName:any=""

  cancel(cancel:any,cancelId: number, cancelName: any, cancelMobileNo: any, cancelDate: any, docName:any){

    this.cName=cancelName;
    this.cMobileNo=cancelMobileNo;
    this.cDate=cancelDate;
    this.cdoctorName=docName;
    var body={
      cName:this.cName,
      cMobileNo:this.cMobileNo,
      cDate:this.cDate,
      cdoctorName:this.cdoctorName,
      reporting:"pending"
    }
    this.cancelService.postCancelledRequest(body).subscribe(value=>{
      alert("Post to Cancel DB" + cancel.cName);
    });
    this.service.deleteAppointment(cancelId).subscribe(()=>{
      alert("Cancelled"+cancelId);
      this.ngOnInit();
    });
    // this.postCancelDetails(cancelMobileNo);
  }


  acceptanceStatus:any="Pending"
  postAcceptDetails(){
    var acceptBody={
      name:this.aName,
      mobileNo:this.aMobileNo,
      date:this.aDate,
      timeing:this.aTime,
      problem:this.aSay,
      doctorName:this.aDoctorName,
      doctorField:this.aDoctorField,
      acceptanceStatus:this.acceptanceStatus,
      reporingStatus:"pending"
    }
    this.cancelService.postAcceptRequest(acceptBody).subscribe(data=>{
    });
  }
  showRemarked:any=""
  remarkMessage=this.fb.group({
    rkMessage:['',Validators.required]
  })
  sendRemarks(RemarkDetails:any){
    alert("Send to" + RemarkDetails)
    this.showRemark(RemarkDetails);
    var body={
      remarkMessage:this.remarkMessage.value.rkMessage,
      reporting:"Sended"
    }
    this.http.patch<any>("http://localhost:3000/cancelledRequest/"+RemarkDetails.id,body).subscribe(()=>{
      alert("Reporting");
    })
  }
  showRemark(details:any){
    this.http.get<any>("http://localhost:3000/patientRegistration").subscribe(value=>{
      const patientRemark=value.find((a:any)=>{
        return a.phone===details.cMobileNo
      });
      if(patientRemark){
        this.sendRemarkToPatient(patientRemark,details)
      }
    })
  }

  baseUrl:any="http://localhost:3000";

  sendRemarkToPatient(getValue:any,cancleDetails:any){
    // alert(getValue.id);
    var body={
      cName:this.cName,
      cMobileNo:this.cMobileNo,
      cDate:this.cDate,
      cdoctorName:this.cdoctorName,
      remarkMessage:this.remarkMessage.value.rkMessage,
      attemptStatus:"false",
      appStatus:"Cancelled! (Try again)"
    }
    this.remark.updateRemark(body,getValue.id).subscribe(()=>{
      alert("Remark Updated");
      this.ngOnInit();
    })
    this.updateLoggedInUser(getValue,cancleDetails);
  }
pat!:PatientPageComponent;
  updateLoggedInUser(getValue:any,cancelDetails:any){
    this.http.get<any>("http://localhost:3000/patientRegistration").subscribe(data=>{
      const patient=data.find((b:any)=>{
        return b.phone===cancelDetails.cMobileNo;
      });
      if(patient){
        // alert("loggedInUser value Updated");
        // this.loginForm.reset();
          // this.userService.loggedInUser = patient;
          // sessionStorage.setItem('loggedInUser', JSON.stringify(patient));
          // this.pat.ngOnInit();
      }
    })
  }
}
