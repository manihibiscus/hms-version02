import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit{

  constructor(private fb:FormBuilder, private http:HttpClient){}

  addDoctorForm=this.fb.group({
    doctorName:[,[Validators.required]],
    field:[,],
    gender:[,],
    experiance:[,],
    licenseNo:[,],
    availableTime:[,],
    phone:[,],
    email:[,]
  })
ok(){
  alert(this.addDoctorForm.value.gender)
}
submit(){
  var body={
    "doctorName": this.addDoctorForm.value.doctorName,
    "field": this.addDoctorForm.value.field,
    "experiance":this.addDoctorForm.value.experiance,
    "licenseNo": this.addDoctorForm.value.licenseNo,
    "available": this.addDoctorForm.value.availableTime
  }
  this.changeValue(body)
}

storeField:any=""
changeValue(body:any){
  const fieldValue = this.addDoctorForm.value.field;
  if(fieldValue && fieldValue=="General doctor"){
    this.storeField="generalDoctorList";
    this.activateDb(body);
    // alert(this.storeField)
  }
  else if(fieldValue && fieldValue=="Pediatrician"){
    this.storeField="pediatricianList";
    this.activateDb(body);
    // alert(this.storeField)
  }
  else if(fieldValue && fieldValue=="Gynecologist"){
    this.storeField="gynecologist";
    this.activateDb(body);
    // alert(this.storeField)
  }
  else if(fieldValue && fieldValue=="Dentist"){
    this.storeField="dentist";
    this.activateDb(body);
    // alert(this.storeField)
  }
  else if(fieldValue && fieldValue=="Cardiologist"){
    this.storeField="cardiologist";
    this.activateDb(body);
    // alert(this.storeField)
  }
  else if(fieldValue && fieldValue=="Cosmic"){
    this.storeField="cosmic";
    this.activateDb(body);
    // alert(this.storeField)
  }
  else if(fieldValue && fieldValue=="Otolaryngologist"){
    this.storeField="otolaryngologist";
    this.activateDb(body);
    // alert(this.storeField)
  }
  else if(fieldValue && fieldValue=="Psychiatrist"){
    this.storeField="psychiatrist";
    this.activateDb(body);
    // alert(this.storeField)
  }
}
activateDb(body:any){
  this.http.post<any>("http://localhost:3000"+'/'+this.storeField,body).subscribe(data=>{
  })
}

  ngOnInit(){

  }

}
