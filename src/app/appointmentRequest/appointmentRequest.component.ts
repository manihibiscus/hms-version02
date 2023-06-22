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
      const currentDate = new Date();
    this.minDate = currentDate.toISOString().split('T')[0];
    const oneWeekLater = new Date();
    oneWeekLater.setDate(oneWeekLater.getDate() + 6);
    this.maxDate = oneWeekLater.toISOString().split('T')[0];
     }
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
    this.http.get<any>("http://localhost:3000/patientRegistration").subscribe(value=>{
      const attempt=value.find((a:any)=>{
        return a.patientName===this.loggedInUser.patientName
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
      this.appUpdate(body)
      this.appointmentForm.resetForm();
      let refe=document.getElementById("ref");
      refe?.click();
    })

  }
  appUpdate(body:any){
    this.http.get<any>("http://localhost:3000/patientRegistration").subscribe(value=>{
      const appStatus=value.find((a:any)=>{
        return a.phone===body.mobileno
      });
      if(appStatus){
        this.updateAppointmentDetailsToPatient(appStatus,body)
      }
    })
  }

  updateAppointmentDetailsToPatient(appStatus:any, value:any){
    this.appointment.updateAppointmentStatus(value,appStatus.id).subscribe(()=>{
      alert("AppointmentDetails are updated to the patientRegisterd DB");
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
a:any=''
h09:any='';
h0930:any='';
h10:any='';
h1030:any='';
h11:any='';
h1130:any='';
h12:any='';
h1230:any='';
h01:any='';
h0130:any='';
h02:any='';
h0230:any='';
h03:any='';
h0330:any='';
h04:any='';

note(){
  this.notice=true
  this.timingService.searchTimingBefore(this.appointmentDate, this.appointmentDocName).subscribe(data=>{
    this.a=data
    for(let item of this.a){
      if(item.appointmentTime=="09:00AM"){
        this.h09=item.appointmentTime
      }
      else if(item.appointmentTime=="09:30AM"){
        this.h0930=item.appointmentTime
      }
      else if(item.appointmentTime=="10:00AM"){
        this.h10=item.appointmentTime
      }
      else if(item.appointmentTime=="10:30AM"){
        this.h1030=item.appointmentTime
      }
      else if(item.appointmentTime=="11:00AM"){
        this.h11=item.appointmentTime
      }
      else if(item.appointmentTime=="11:30AM"){
        this.h1130=item.appointmentTime
      }
      else if(item.appointmentTime=="12:00PM"){
        this.h12=item.appointmentTime
      }
      else if(item.appointmentTime=="01:00PM"){
        this.h01=item.appointmentTime
      }
      else if(item.appointmentTime=="01:30PM"){
        this.h0130=item.appointmentTime
      }
      else if(item.appointmentTime=="02:00PM"){
        this.h02=item.appointmentTime
      }
      else if(item.appointmentTime=="02:30PM"){
        this.h0230=item.appointmentTime
      }
      else if(item.appointmentTime=="03:00PM"){
        this.h03=item.appointmentTime
      }
      else if(item.appointmentTime=="03:30PM"){
        this.h0330=item.appointmentTime
      }
      else if(item.appointmentTime=="04:00PM"){
        this.h04=item.appointmentTime
      }
      else{
        alert("Engaged")
      }
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
  alert("mani")
}

}
