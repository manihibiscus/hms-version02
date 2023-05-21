import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserServiceService } from '../userService.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, NgForm } from '@angular/forms';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-appointmentRequest',
  templateUrl: './appointmentRequest.component.html',
  styleUrls: ['./appointmentRequest.component.css']
})
export class AppointmentRequestComponent implements OnInit {

  loggedInUser:any;
  storedField:any;
  listAppointment:any;
  todayDate:Date=new Date();
  Attempt:any=""
  // AttemptStatus:any;
  @ViewChild('appointmentForm') appointmentForm!: NgForm;
  constructor(private userServeice:UserServiceService,
    private route:Router, private http:HttpClient,
    private fb:FormBuilder,
    private appointment:AppointmentService,)
     {
      this.appointment.getAppointmentDetails().subscribe(value=>{
        this.listAppointment=value;
      })
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
      // if(attempt){
        this.Attempt=attempt.attemptStatus;
      // }
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
  appStatus:any="Pending for appointment"

  appointmentSubmit(){
    var body={
      patientName:this.loggedInUser.patientName,
      mobileno:this.loggedInUser.phone,
      appointmentDate:this.appointmentDate,
      appointmentTime:this.appointmentTime+':'+this.appointmentMinute+this.appointmetnAmPM,
      say:this.appointmentSpecific,
      doctorField:this.appointmentField,
      doctorName:this.appointmentDocName,
      attemptStatus:"true",
      appStatus:this.appStatus,
      remarkMessage:""
    }
    this.appointment.postAppointmentDetails(body).subscribe(data=>{
      alert("Appointment Submitted");
      this.a(body)
      this.appointmentForm.resetForm();
      let refe=document.getElementById("ref");
      refe?.click();
    })

  }
  a(body:any){
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
notice:boolean=false
note(){
  this.notice=true
  // alert("Check the working hours details of the doctor below and select the time")
}
note2(){
  this.notice=false
  // alert("Check the working hours details of the doctor below and select the time")
}
}
