import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms'
import { RegisterServiceService } from '../registerService.service';
import { Router } from '@angular/router';
import { confirmedValidator } from '../confrimPass';
import { HttpClient } from '@angular/common/http';
import { IDeactivateComponent } from '../conformation.guard';

@Component({
  selector: 'app-patientRegistration',
  templateUrl: './patientRegistration.component.html',
  styleUrls: ['./patientRegistration.component.css']
})
export class PatientRegistrationComponent implements OnInit,IDeactivateComponent {

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
    insurance:[,[Validators.required]],
    password:[,[Validators.required]],
    cpassword:[,[Validators.required]]
  },
  { validator: confirmedValidator('password', 'cpassword') }
  )

  register(){

    if(this.PatientRegister.invalid){
      alert("Please Enter all the Fields");
    }

    else if(this.PatientRegister.valid){
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
        // this.PatientRegister.reset();
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
  canExit(){
    if(this.PatientRegister.invalid)
      {
      return confirm("Your content was not saved");
    }
    else{
      return true;
    }
  }
}
