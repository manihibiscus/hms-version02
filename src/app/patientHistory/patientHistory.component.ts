import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GenerateBillsService } from '../generate-bills/generateBills.service';
import { PatientServiceService } from '../patientPage/patientService.service';
import { BillServiceService } from '../payBills/billService.service';
import { FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms'


@Component({
  selector: 'app-patientHistory',
  templateUrl: './patientHistory.component.html',
  styleUrls: ['./patientHistory.component.css']
})
export class PatientHistoryComponent implements OnInit {
  constructor(private http:HttpClient,
    private generateBills:GenerateBillsService,
    private bill:BillServiceService, 
    private service:PatientServiceService,
    private fb:FormBuilder) { }


  loggedUser:any="";
  cancelled:any="";
  completed:any="";
  history:any="";
  ngOnInit() {
    let sessionUser = sessionStorage.getItem('loggedInUser');
    if (sessionUser) {
      this.loggedUser = JSON.parse(sessionUser);
      // this.refresh(sessionUser);
    }
    this.service.searchCancel(this.loggedUser.phone).subscribe((value)=>{
      this.cancelled=value
    });
    this.service.searchAccept(this.loggedUser.phone).subscribe((data1)=>{
      this.completed=data1;
    });
    this.bill.searchPayment(this.loggedUser.phone).subscribe((value1)=>{
      this.history=value1;
    });
}
  searchUpdaid(): Observable<any> {
    return this.http.get<any>("http://localhost:3000/billDetails").pipe(
      map((data) => {
        return data.filter(
          (item:any) =>
            item.paymentStatus === "Unpaid"
        );
      })
    );
  }

  showCancel:any="false"
  showAccept:any="false"
  showPending:any="false"
  showSuccess:any="false"
  showImage:any="true"
  cancel(){
    this.showCancel="true";
    this.showAccept="false";
    this.showPending="false";
    this.showSuccess="false";
    this.showImage="false"

  }
  accept(){
    this.showCancel="false";
    this.showAccept="true";
    this.showPending="false";
    this.showSuccess="false";
    this.showImage="false"

  }
  paymentPending(){
    this.showCancel="false";
    this.showAccept="false";
    this.showPending="true";
    this.showSuccess="false";
    this.showImage="false"

  }
  paymentSuccess(){
    this.showCancel="false";
    this.showAccept="false";
    this.showPending="false";
    this.showSuccess="true";
    this.showImage="false"

  }
  profile(){
    this.showCancel="false";
    this.showAccept="false";
    this.showPending="false";
    this.showSuccess="false";
    this.showImage="true"
  }
  dialogBox:boolean=false;
editForm=this.fb.group({
  name:[,[Validators.required]],
  fatherName:[,[Validators.required]],
  bloodGroup:[,[Validators.required]],
  emailId:[,[Validators.required]],
  phoneNumber:[,[Validators.required]]
})

  changeProfile(){
    this.dialogBox=true
    this.editForm.controls['name'].setValue(this.loggedUser.patientName)
    this.editForm.controls['fatherName'].setValue(this.loggedUser.fatherName)
    this.editForm.controls['bloodGroup'].setValue(this.loggedUser.blood)
    this.editForm.controls['emailId'].setValue(this.loggedUser.email)
    this.editForm.controls['phoneNumber'].setValue(this.loggedUser.phone)
    // alert("Working...")
  }
  changePassword(){

  }
  closeBanner(){
    this.dialogBox=false

  }
  editProfile(){
    var ref=document.getElementById('reference');
    ref?.click();
    var body={
      "patientName": this.editForm.value.name,
      "fatherName": this.editForm.value.fatherName,
      "blood": this.editForm.value.bloodGroup,
      "email": this.editForm.value.emailId,
      "phone": this.editForm.value.phoneNumber
    }
    this.http.patch<any>("http://localhost:3000/patientRegistration/"+this.loggedUser.id,body).subscribe(()=>{
      alert("Profile Edited Successfully")
    })
  }
}
