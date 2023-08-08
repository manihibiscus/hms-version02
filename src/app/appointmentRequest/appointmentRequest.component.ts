import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { UserServiceService } from '../userService.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, NgForm } from '@angular/forms';
import { AppointmentService } from '../appointment.service';
import { TimingService } from './timing.service';
import { Observable, count, map } from 'rxjs';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-appointmentRequest',
  templateUrl: './appointmentRequest.component.html',
  styleUrls: ['./appointmentRequest.component.css']
})
export class AppointmentRequestComponent implements OnInit{

  loggedInUser:any;
  storedField:any;
  listAppointment:any;
  todayDate:Date=new Date();
  Attempt:any=""

getTimingBefore:any='';
  // AttemptStatus:any;
  @ViewChild('appointmentForm') appointmentForm!: NgForm;
  minDate:any=''
  maxDate:any=''
  constructor(private userServeice:UserServiceService,
    private route:Router, private http:HttpClient,
    private fb:FormBuilder,
    private appointment:AppointmentService,
    private timingService:TimingService)
     {
      this.appointment.getAppointmentDetails().subscribe(value=>{
        this.listAppointment=value;
      })
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow.toISOString().split('T')[0];
    const oneWeekLater = new Date();
    oneWeekLater.setDate(oneWeekLater.getDate() + 7);
    this.maxDate = oneWeekLater.toISOString().split('T')[0];
     }
  ngOnInit() {
    const sessionUser = sessionStorage.getItem('loggedInUser');
    if (sessionUser) {
      this.loggedInUser = JSON.parse(sessionUser);
    } else if (this.userServeice.loggedInUser !== null) {
      this.loggedInUser = this.userServeice.loggedInUser;
    } else {
      alert('You are Loggedout. Login to continue');
      this.route.navigate(['/login']);
    }
    this.http.get<any>("http://localhost:3000/patientRegistration").subscribe(value=>{
      const attempt=value.find((item:any)=>{
        return item.patientName===this.loggedInUser.patientName
      });
      if(attempt){
        this.Attempt=attempt.attemptStatus;
      }
    })
  }

  appointmentDate:any="";
  appointmentTime:any="";
  appointmentMinute:any="";
  appointmetnAmPM:any="";
  appointmentSpecific:any="";
  appointmentField:any="";
  appointmentDocName:any="";

  amStatus:boolean=false;
  pmStatus:boolean=false;

  filterDates(): boolean {
    return new Date(this.appointmentDate) >= this.todayDate;
  }
  appStatus:any="Pending for appointment"

  appointmentSubmit(){
    var body={
      patientName:this.loggedInUser.patientName,
      mobileno:this.loggedInUser.phone,
      appointmentDate:this.appointmentDate,
      appointmentTime:this.appointmentTime,
      say:this.appointmentSpecific,
      doctorField:this.appointmentField,
      doctorName:this.appointmentDocName,
      attemptStatus:"true",
      appStatus:this.appStatus,
      appoimtmentHour:this.appointmentTime,
      apppointmentMin:this.appointmentMinute,
      remarkMessage:""
    }
    this.appointment.postAppointmentDetails(body).subscribe(data=>{
      alert("Appointment Submitted");
    });
    this.appointment.updateAppointmentStatus(body,this.loggedInUser.id).subscribe(()=>{
      alert("AppointmentDetails are updated to the patientRegisterd DB");
      this.appointmentForm.resetForm();
      let refe=document.getElementById("ref");
      refe?.click();
      this.ngOnInit();
    })

  }
changeValue(){
  if(this.appointmentField=="General doctor"){
    this.appointment.storeField="generalDoctorList";
    this.activateDb();
    // alert(this.appointment.storeField)
  }
  else if(this.appointmentField=="Pediatrician"){
    this.appointment.storeField="pediatricianList";
    this.activateDb();
    // alert(this.appointment.storeField)
  }
  else if(this.appointmentField=="Gynecologist"){
    this.appointment.storeField="gynecologist";
    this.activateDb();
    // alert(this.appointment.storeField)
  }
  else if(this.appointmentField=="Dentist"){
    this.appointment.storeField="dentist";
    this.activateDb();
    // alert(this.appointment.storeField)
  }
  else if(this.appointmentField=="Cardiologist"){
    this.appointment.storeField="cardiologist";
    this.activateDb();
    // alert(this.appointment.storeField)
  }
  else if(this.appointmentField=="Cosmic"){
    this.appointment.storeField="cosmic";
    this.activateDb();
    // alert(this.appointment.storeField)
  }
  else if(this.appointmentField=="Otolaryngologist"){
    this.appointment.storeField="otolaryngologist";
    this.activateDb();
    // alert(this.appointment.storeField)
  }
  else if(this.appointmentField=="Psychiatrist"){
    this.appointment.storeField="psychiatrist";
    this.activateDb();
    // alert(this.appointment.storeField)
  }
}
activateDb(){
  this.http.get<any>("http://localhost:3000"+'/'+this.appointment.storeField).subscribe(data=>{
    this.storedField=data;
  })
}
doctorDetails:any=""
doctorName(){
  this.http.get<any>("http://localhost:3000"+'/'+this.appointment.storeField).subscribe(data=>{
    const doc=data.find((a:any)=>{
      return a.doctorName==this.appointmentDocName
    });
    if(doc){
      this.doctorDetails=doc;
    }
  })
}
notice:boolean=false;
appDet:any=''
h09:any='';
h0920:any='';
h0940:any='';
h10:any='';
h1020:any='';
h1040:any='';
h11:any='';
h1120:any='';
h1140:any='';
h12:any='';
h1220:any='';
h1240:any='';
h01:any='';
h0120:any='';
h0140:any='';
h02:any='';
h0220:any='';
h0240:any='';
h03:any='';
h0320:any='';
h0340:any='';
h04:any='';

note(){
  this.notice=true
  if(this.appointmentTime==null || this.appointmentTime==''){
  this.empty();
  }
  else{
    this.appointmentTime='';
    this.note();
  }
}
empty(){
this.h09='';
this.h0920='';
this.h0940='';
this.h10='';
this.h1020='';
this.h1040='';
this.h11='';
this.h1120='';
this.h1140='';
this.h12='';
this.h1220='';
this.h1240='';
this.h01='';
this.h0120='';
this.h0120='';
this.h0140='';
this.h02='';
this.h0220='';
this.h0240='';
this.h03='';
this.h0320='';
this.h0340='';
this.h04='';
this.timimg();
}
timimg(){
  this.timingService.searchTimingBefore(this.appointmentDate, this.appointmentDocName).subscribe(data=>{
    this.appDet=data
    for(let item of this.appDet){
      if(item.appointmentTime=="09:00AM"){
        this.h09=item.appointmentTime
      }
      else if(item.appointmentTime=="09:20AM"){
        this.h0920=item.appointmentTime
      }
      else if(item.appointmentTime=="09:40AM"){
        this.h0940=item.appointmentTime
      }
      else if(item.appointmentTime=="10:00AM"){
        this.h10=item.appointmentTime
      }
      else if(item.appointmentTime=="10:20AM"){
        this.h1020=item.appointmentTime
      }
      else if(item.appointmentTime=="10:40AM"){
        this.h1040=item.appointmentTime
      }
      else if(item.appointmentTime=="11:00AM"){
        this.h11=item.appointmentTime
      }
      else if(item.appointmentTime=="11:20AM"){
        this.h1120=item.appointmentTime
      }
      else if(item.appointmentTime=="11:40AM"){
        this.h1140=item.appointmentTime
      }
      else if(item.appointmentTime=="12:00PM"){
        this.h12=item.appointmentTime
      }
      else if(item.appointmentTime=="01:00PM"){
        this.h01=item.appointmentTime
      }
      else if(item.appointmentTime=="01:20PM"){
        this.h0120=item.appointmentTime
      }
      else if(item.appointmentTime=="01:40PM"){
        this.h0140=item.appointmentTime
      }
      else if(item.appointmentTime=="02:00PM"){
        this.h02=item.appointmentTime
      }
      else if(item.appointmentTime=="02:20PM"){
        this.h0220=item.appointmentTime
      }
      else if(item.appointmentTime=="02:40PM"){
        this.h0240=item.appointmentTime
      }
      else if(item.appointmentTime=="03:00PM"){
        this.h03=item.appointmentTime
      }
      else if(item.appointmentTime=="03:20PM"){
        this.h0320=item.appointmentTime
      }
      else if(item.appointmentTime=="03:40PM"){
        this.h0340=item.appointmentTime
      }
      else if(item.appointmentTime=="04:00PM"){
        this.h04=item.appointmentTime
      }
      // else{
      //   alert("Engaged")
      // }
    }
    // var count=Object.keys(this.a).length
    // alert(count)
  })
}

note2(){
  this.notice=false
  // alert("Check the working hours details of the doctor below and select the time")

}

chageFormat(){
   if((this.appointmentTime>=9 && this.appointmentTime<=11)){
    this.pmStatus=true;
    this.amStatus=false;
    // alert(this.pmStatus)
  }
  else if((this.appointmentTime>=1 && this.appointmentTime<=6)|| this.appointmentTime==12){
    this.pmStatus=false;
    this.amStatus=true;
  }

}
checking(){
  this.notice=false
}

}
