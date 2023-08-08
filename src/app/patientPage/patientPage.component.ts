import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../userService.service';
import { PatientServiceService } from './patientService.service';
import { HttpClient } from '@angular/common/http';
import { PatientModel } from './patient.model';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-patientPage',
  templateUrl: './patientPage.component.html',
  styleUrls: ['./patientPage.component.css']
})
export class PatientPageComponent implements OnInit {
  loggedUser:any=""
  currDate=new Date();
  currYear=this.currDate.getFullYear()
  age:any=""
  constructor(private userServeice:UserServiceService, private route:Router,
    private http:HttpClient,
    private service:PatientServiceService
    ) { }
    userLogObj : PatientModel=new PatientModel();
    refereshData:any="";
    color:any=""
    cancel:any=""
    completed:any=""
    bmiCommand:any=""
  ngOnInit() {

    // sessionStorage.setItem('updateUser', JSON.stringify(this.userServeice.loggedInUser));
    let sessionUser = sessionStorage.getItem('loggedInUser');
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
    // Age
    var birthYear=this.loggedUser.date.substring(0,4)
    this.age=this.currYear-birthYear;
    // End
    this.http.get<any>(environment.getPatientRegistrationDetails).subscribe(data=>{
        const value=data.find((a:any)=>{
          return a.email===this.loggedUser.email
        })
        if(value){
          this.refereshData=value
        }
    });
    this.service.searchCancel(this.loggedUser.phone).subscribe((value)=>{
      this.cancel=value
    });
    this.service.searchAccept(this.loggedUser.phone).subscribe((data1)=>{
      this.completed=data1;
    })

  }

  // loggedOff(value:any){
  //   // this.loggedInUser=""
  //   value=sessionStorage.removeItem('loggedInUser')
  // }
  // refresh(sessionUser:any){
  //   sessionStorage.setItem('updateUser', JSON.stringify(this.userLogObj.userLogged));
  //   sessionUser = sessionStorage.removeItem('updateUser');
  //   this.loggedUser = JSON.parse(sessionUser);
  //   alert("Reload"+this.userLogObj.userLogged);
  // }

  weight!: number;
  height!: number;
  bmi!: number;

  calculateBMI() {
    const heightInMeters = this.height / 100;
    this.bmi = this.weight / (heightInMeters * heightInMeters);
    var ref=document.getElementById("reference");
    ref?.click();
  }


  closeBMI:boolean=false;
  closeBanner(){
    this.closeBMI=false
  }
  checkBMI(){
    this.closeBMI=true
  }
}


