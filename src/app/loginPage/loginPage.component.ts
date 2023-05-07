import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetLoginService } from '../getLogin.service';
import { UserServiceService } from '../userService.service';
import { Location } from '@angular/common';
import { PatientModel } from '../patientPage/patient.model';

@Component({
  selector: 'app-loginPage',
  templateUrl: './loginPage.component.html',
  styleUrls: ['./loginPage.component.css']
})
export class LoginPageComponent implements OnInit {


  constructor(private service:GetLoginService, private formBuilder:FormBuilder, private http:HttpClient, private router:Router, private userService:UserServiceService, private location: Location) { }
  logindetails:any="";
  ngOnInit(){

  }

  loginForm=this.formBuilder.group({
    userId:[,[Validators.required] ],
    password:[,[Validators.required]]
  })
  errors:any=false;
  userLogObj : PatientModel=new PatientModel();
  login(){
    this.patients();
    this.admins();
    this.doctors();
    if(this.errors){
      alert("INVALID")
      this.refresh();
    }
  }
  patients() {
    this.http.get<any>("http://localhost:3000/patientRegistration").subscribe(data=>{
      const patient=data.find((b:any)=>{
        return b.email===this.loginForm.value.userId && b.cpassword===this.loginForm.value.password
      });

      if(patient){
        alert("Login Successfully");
        // this.loginForm.reset();
          this.userLogObj.userLogged=patient;
          this.userService.loggedInUser = patient;
          sessionStorage.setItem('loggedInUser', JSON.stringify(patient));
        this.router.navigate(['patienthome'])
      }
      else{
        this.errors=true
      }
    })
  }
  admins() {
    this.http.get<any>("http://localhost:3000/adminDetails").subscribe(res=>{
      const users=res.find((a:any)=>{
        return a.userId===this.loginForm.value.userId && a.password===this.loginForm.value.password
      });
      if(users){
        alert("Login Successfully");
        this.loginForm.reset();
          this.userService.loggedInUser = users;
          sessionStorage.setItem('loggedInUser', JSON.stringify(users));
        this.router.navigate(['adminhome' ])
      }
      else{
        this.errors=true
      }
    })
  }
  doctors(){
    this.http.get<any>("http://localhost:3000/doctorDetails").subscribe(res=>{
      const doctor=res.find((a:any)=>{
        return a.userId===this.loginForm.value.userId && a.password===this.loginForm.value.password
      });
      if(doctor){
        alert("Login Successfully");
        this.loginForm.reset();
          this.userService.loggedInUser = doctor;
          sessionStorage.setItem('loggedInUser', JSON.stringify(doctor));
        this.router.navigate(['doctorhome'])
      }
      else{
        this.errors=true
      }
    })

  }

  refresh(): void {
    window.location.reload();
  }
}



