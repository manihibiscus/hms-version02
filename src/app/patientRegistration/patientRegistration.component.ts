import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms'
import { RegisterServiceService } from '../registerService.service';
import { Router } from '@angular/router';
import { confirmedValidator } from '../confrimPass';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-patientRegistration',
  templateUrl: './patientRegistration.component.html',
  styleUrls: ['./patientRegistration.component.css']
})
export class PatientRegistrationComponent implements OnInit {

  // patName:any="";
  // patFathName:any="";
  // patGender:any="";
  // patBlood:any="";
  // patDate:any="";
  // patPhone:any="";
  // patImage:any="";
  // patAddress:any="";
  // patID:any="";
  // insure:any=""

  constructor(private formBuilder:FormBuilder,
    private service: RegisterServiceService,
    private route:Router,
    private http:HttpClient) { }
  PatientRegister=this.formBuilder.group({
    patientName:[,[Validators.required,]],
    fatherName:[,[Validators.required]],
    gender:[,[Validators.required]],
    blood:[,[Validators.required]],
    date:[,[Validators.required]],
    email:[,[Validators.required]],
    phone:[,[Validators.required]],
    address:[,[Validators.required]],
    image:[,[Validators.required]],
    insurance:[,[Validators.required]],
    password:[,[Validators.required]],
    cpassword:[,[Validators.required]]
  },
  { validator: confirmedValidator('password', 'cpassword') }
  )

  registrr(){
    // var value1=this.patName.substring(0,3).toUpperCase();
    // var value2=this.patPhone.substring(6);
    // var result=value1+value2;
    // var body={
    //    patientName:this.patName,
    //    PatientFatherName:this.patFathName,
    //    PatientGender:this.patGender,
    //    PatientBlood:this.patBlood,
    //    patientDoB:this.patDate,
    //    patientPhone:this.patPhone,
    //    patientAddress:this.patAddress,
    //    patientImage:this.patImage,
    //    patientId:this.patID,
    //    InsuranceStatus:this.insure,
    //    password:result
    // }
    if(!this.PatientRegister.valid){
      alert("Please fill all the Details");
    }
    else if(this.PatientRegister.valid){
      // this.service.postRegDet(this.PatientRegister.value).subscribe(data =>{
      //   alert("Registerd Sucessfully Press ok to Login");
      //   this.PatientRegister.reset();
      //   this.route.navigate(['login']);
      // }, err=>{
      //   alert("Something went wrong");
      // })
      this.http.get<any>("http://localhost:3000/patientRegistration").subscribe(data=>{
    const compare=data.find((a:any)=>{
      return a.email===this.PatientRegister.value.email;
    });
    if(compare){
      alert(this.PatientRegister.value.email+','+' '+"This Email was Already Registered ");
    }
    else{
      this.service.postRegDet(this.PatientRegister.value).subscribe(data =>{
        alert("Registerd Sucessfully Press ok to Login");
        this.PatientRegister.reset();
        this.route.navigate(['login']);
      }, err=>{
        alert("Something went wrong");
      })
    }
  })
    }

  }
  ngOnInit() {

  }

}
