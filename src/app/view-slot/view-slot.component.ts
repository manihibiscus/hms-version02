import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { AppointmentCancelService } from '../appointmentCancel.service';
import { UserServiceService } from '../userService.service';
import { FormBuilder, Validators } from '@angular/forms';
import { RemarkServiceService } from './remarkService.service';
import { PatientPageComponent } from '../patientPage/patientPage.component';
import { Router } from '@angular/router';
import {Observable,map} from 'rxjs';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-view-slot',
  templateUrl: './view-slot.component.html',
  styleUrls: ['./view-slot.component.css']
})

export class ViewSlotComponent {
  constructor(private http:HttpClient,
    private cancelService:AppointmentCancelService,
    private fb:FormBuilder,
    private remark:RemarkServiceService,
    private userServeice:UserServiceService,
    private route:Router
    ) { }
  getAppointment:any="";
  acceptedAppointment:any="";
  remarkAppointment:any="";
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
    this.searchRequestPatients().subscribe(data=>{
      this.getAppointment=data;
    })

    this.http.get<any>(environment.getAcceptRequestDetails).subscribe(acceptDate=>{
    this.acceptedAppointment=acceptDate;
  });
  this.searchRemarking().subscribe(remarkDate=>{
    this.remarkAppointment=remarkDate;
  });

  }
  searchRemarking(): Observable<any> {
    return this.http.get<any>(environment.getCancelledRequestDetails).pipe(
      map((data) => {
        return data.filter(
          (item:any) =>
            item.reporting === "pending" && item.cdoctorName===this.loggedInUser.doctorName
        );
      })
    );
  }
  searchRequestPatients(): Observable<any> {
    return this.http.get<any>(environment.getAppointmentDetails).pipe(
      map((data) => {
        return data.filter(
          (item:any) =>
            item.doctorName === this.loggedInUser.doctorName
        );
      })
    );
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
  accept(accpetedDetails:any, acceptId: number, acceptName: any, acceptMobileNo: any,
        acceptDate: any,acceptTime: any, acceptSay:any, doctorName:any, doctorField: any){
    this.aName=acceptName;
    this.aMobileNo=acceptMobileNo;
    this.aDate=acceptDate;
    this.aTime=acceptTime;
    this.aSay=acceptSay;
    this.aDoctorName=doctorName;
    this.aDoctorField=doctorField;
    this.first(accpetedDetails);
    this.acceptToPatient(acceptMobileNo);
    this.postAcceptDetails();
  }
  first(appDetail:any){
    this.http.get<any>(environment.getAppointmentDetails).subscribe(info=>{
      const update=info.find((search:any)=>{
        return search.patientName===appDetail.patientName && search.mobileno===appDetail.mobileno && search.appointmentDate===appDetail.appointmentDate && search.appointmentTime===appDetail.appointmentTime
      });
      if(update){
        var body={
          status:"Accepted"
        }
        this.http.patch<any>(environment.getAppointmentDetails+update.id,body).subscribe(()=>{
          alert("Updated on appointmentDetails DB");
          this.ngOnInit();
      });
      }
    })
  }
  appStatus:any="Accepted for appointment"
  acceptToPatient(acceptMobileNo:any){
    this.http.get<any>(environment.getPatientRegistrationDetails).subscribe(value=>{
      const patient=value.find((a:any)=>{
        return a.phone===acceptMobileNo
    });
    var body={
      appStatus:this.appStatus
    }
    if(patient){
      this.http.patch<any>(environment.getPatientRegistrationDetails+patient.id,body).subscribe(data=>{
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
      alert("Posted to Cancel DB");
    });
    this.firstcancel(cancel);
  }
  firstcancel(appDetail:any){
    this.http.get<any>(environment.getAppointmentDetails).subscribe(info=>{
      const update=info.find((search:any)=>{
        return search.patientName===appDetail.patientName && search.mobileno===appDetail.mobileno && search.appointmentDate===appDetail.appointmentDate && search.appointmentTime===appDetail.appointmentTime
      });
      if(update){
        var body={
          status:"Cancelled"
        }
        this.http.patch<any>(environment.getAppointmentDetails+update.id,body).subscribe(()=>{
          alert("Updated on appointmentDetails DB Cancel!!");
          this.ngOnInit();
      });
      }
    })
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
    this.http.patch<any>(environment.getCancelledRequestDetails+RemarkDetails.id,body).subscribe(()=>{
      alert("Reporting");
    })
  }
  showRemark(details:any){
    this.http.get<any>(environment.getPatientRegistrationDetails).subscribe(value=>{
      const patientRemark=value.find((a:any)=>{
        return a.phone===details.cMobileNo
      });
      if(patientRemark){
        this.sendRemarkToPatient(patientRemark,details)
      }
    })
  }

  baseUrl:any=environment.getUrl;

  sendRemarkToPatient(getValue:any,cancleDetails:any){
    var body={
      cName:this.cName,
      cMobileNo:this.cMobileNo,
      cDate:this.cDate,
      cdoctorName:this.cdoctorName,
      remarkMessage:this.remarkMessage.value.rkMessage,
      attemptStatus:"false",
      appStatus:"Cancelled! (Try again)",
      consultingFee:"",
      otherFee:"",
      Total:""
    }
    this.remark.updateRemark(body,getValue.id).subscribe(()=>{
      alert("Remark Updated");
      this.ngOnInit();
      this.remarkMessage.get('rkMessage')?.reset('');
    })
  }
}
