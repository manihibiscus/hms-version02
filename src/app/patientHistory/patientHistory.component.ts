import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GenerateBillsService } from '../generate-bills/generateBills.service';
import { PatientServiceService } from '../patientPage/patientService.service';
import { BillServiceService } from '../payBills/billService.service';
import { FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms'
import { confirmedValidator } from '../confrimPass';
import { environment } from 'src/environments/environment';



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
    private fb:FormBuilder,
    private renderer:Renderer2,
    private elRef: ElementRef) { }


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
    return this.http.get<any>(environment.getBillDetails).pipe(
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
    var ref=document.getElementById("back");
    ref?.click();
  }
  accept(){
    this.showCancel="false";
    this.showAccept="true";
    this.showPending="false";
    this.showSuccess="false";
    this.showImage="false"
    var ref=document.getElementById("back");
    ref?.click();
  }
  paymentPending(){
    this.showCancel="false";
    this.showAccept="false";
    this.showPending="true";
    this.showSuccess="false";
    this.showImage="false"
    var ref=document.getElementById("back");
    ref?.click();
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

    var ref=document.getElementById("back");
    ref?.click();
  }
  dialogBox:boolean=false;
  changePasswordBox:boolean=false;
  show:boolean=false

  visiblePassword() {
    this.show = !this.show;
  }

  changePassForm=this.fb.group({
    oldPassword:[,[Validators.required]],
    password:[,[Validators.required]],
    cpassword:[,[Validators.required]]
  },
  { validator: confirmedValidator('password', 'cpassword') }

  )
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
    this.changePasswordBox=true
  }
  closeBanner(){
    this.dialogBox=false
    this.changePasswordBox=false
    this.changePassForm.reset();


  }

  editProfile(){
    var body={
      "patientName": this.editForm.value.name,
      "fatherName": this.editForm.value.fatherName,
      "blood": this.editForm.value.bloodGroup,
      "email": this.editForm.value.emailId,
      "phone": this.editForm.value.phoneNumber
    }
    if(this.editForm.invalid){
      alert("Enter all the fields")
    }
    else{
    this.http.patch<any>(environment.getPatientRegistrationDetails+this.loggedUser.id,body).subscribe(()=>{
      alert("Profile Edited Successfully");
      var ref=document.getElementById('reference');
      ref?.click();
      this.http.get<any>(environment.getPatientRegistrationDetails+this.loggedUser.id).subscribe((value)=>{
      sessionStorage.setItem('loggedInUser', JSON.stringify(value));
      this.ngOnInit();
      this.editForm.reset();
      })

    })
    }
  }
  changePass(){
    var body={
      "password": this.changePassForm.value.password,
      "cpassword": this.changePassForm.value.cpassword
    }
    if(this.changePassForm.invalid){
      alert("Enter the Field");
    }
    else{
      if(this.changePassForm.value.oldPassword != this.loggedUser.password){
        alert("Your old Password was Incorrect");
      }
      else{
    this.http.patch<any>(environment.getPatientRegistrationDetails+this.loggedUser.id,body).subscribe(()=>{
      alert("Password Successfully Changed");
      var ref=document.getElementById('reference');
      ref?.click();
      this.http.get<any>(environment.getPatientRegistrationDetails+this.loggedUser.id).subscribe((value)=>{
      sessionStorage.setItem('loggedInUser', JSON.stringify(value));
      this.ngOnInit();
      this.changePassForm.reset();
      })

    })
    }
  }

  }
  printing:boolean=false;

  printPatientId:any="";
  printName:any="";
  printDoctorName:any="";
  printDoctorField:any="";
  printConFee:any="";
  printOthFee:any="";
  printTotFee:any="";
  printStatus:any="";
  printAppointmentDate:any="";

  clicking(item:any) {
    this.printing=true
    this.generate(item);
  }
  generate(item:any){
    this.printName=item.patientName;
    this.printDoctorName=item.doctorName;
    this.printDoctorField=item.doctorField;
    this.printConFee=item.consultingFee;
    this.printOthFee=item.otherFee;
    this.printTotFee=item.Total;
    this.printStatus=item.paymentStatus;
   this.printAppointmentDate= item.appointmentDate;

  }
  printForm(){
    window.print();
  }
  back(){
    this.printing=false
  }
}
