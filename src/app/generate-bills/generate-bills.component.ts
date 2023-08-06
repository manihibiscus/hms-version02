import { Component } from '@angular/core';
import { GenerateBillsService } from './generateBills.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenerateBills } from './generateBills.model';
import { HttpClient } from '@angular/common/http';
import { GModel } from './gModel';
import { ShowBillToPatient } from './showBill.model';
import { UserServiceService } from '../userService.service';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-generate-bills',
  templateUrl: './generate-bills.component.html',
  styleUrls: ['./generate-bills.component.css']
})
export class GenerateBillsComponent {
  dateNow : Date=new Date();
  otherFee:any="";

  constructor(private service:GenerateBillsService,
    private http:HttpClient,
    private fb:FormBuilder,
     private generateBills:GenerateBillsService,
     private userServeice:UserServiceService,
     private route:Router) { }
  getBills:any="";
  genereateBills:any="";
  getReceipterDetails:any=""
  loggedInUser:any=""
  billForm=this.fb.group({
    patientId:[,[Validators.required] ],
    patinetName:[,[Validators.required] ],
    doctorName:[,[Validators.required]],
    doctorField:[,[Validators.required]],
    contactNo:[,[Validators.required]],
    consultingFee:[,[Validators.required]],
    otherFee:[,[Validators.required]],
    appointmentDate:[,]
  })

  generateBillDetailsObj : GenerateBills=new GenerateBills()
  gModelObj : GModel= new GModel();
  total:any=0;
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
    this.service.getAcceptRequest().subscribe(data=>{
      this.getBills=data
    });
    this.searchSentToPatient().subscribe(value=>{
      this.getReceipterDetails=value
    });
    // alert(this.getBills.value.acceptanceStatus);
    // if(this.getBills.value.acceptanceStatus=="pending"){
    //   let reference=document.getElementById("refgenerate");
    // }
    // this.gModelObj.status=this.getBills.acceptanceStatus.value;
    // alert(this.gModelObj.status);
  }
  searchSentToPatient(): Observable<any> {
    return this.http.get<any>(environment.getBillDetails).pipe(
      map((data) => {
        return data.filter(
          (item:any) =>
            item.status === "Still not send to patient"
        );
      })
    );
  }

  result!:number | null
  sum(value1:string, value2:string){
   this.result=parseInt(value1)+parseInt(value2)
    // alert(this.result);
  }
  generate(row:any, acceptance:any){
    if(acceptance=="success"){
    this.billForm.controls['patientId'].setValue(row.id);
    this.billForm.controls['patinetName'].setValue(row.name);
    this.billForm.controls['doctorName'].setValue(row.doctorName);
    this.billForm.controls['doctorField'].setValue(row.doctorField);
    this.billForm.controls['contactNo'].setValue(row.mobileNo);
    this.billForm.controls['appointmentDate'].setValue(row.date);

      // alert(acceptance);
    }
    else{
      row.isDisabled=true;
    }
  }
  submitBill(){
    this.generateBillDetailsObj.patientId=this.billForm.value.patientId;
    this.generateBillDetailsObj.name=this.billForm.value.patinetName;
    this.generateBillDetailsObj.doctorName=this.billForm.value.doctorName;
    this.generateBillDetailsObj.doctorField=this.billForm.value.doctorField;
    this.generateBillDetailsObj.mobileNo=this.billForm.value.contactNo;
    this.generateBillDetailsObj.consultingFee='₹'+this.billForm.value.consultingFee;
    this.generateBillDetailsObj.otherFee= '₹'+this.billForm.value.otherFee;
    this.generateBillDetailsObj.Total='₹'+this.result;
    this.generateBillDetailsObj.status="Still not send to patient";
    this.generateBillDetailsObj.appointmentDate=this.billForm.value.appointmentDate;
    let ref=document.getElementById("ref");
    ref?.click();
    this.generateBills.postBillDetails(this.generateBillDetailsObj).subscribe(res=>{
      alert("Generarted");
    });
    this.deleteGenerate(this.generateBillDetailsObj.patientId);
    // this.showBill(this.generateBillDetailsObj);
    this.billForm.reset();
    this.result=null;
  }
  showPatientBill:any=""
  showBill(billData:any){
    this.http.get<any>(environment.getPatientRegistrationDetails).subscribe(value=>{
      const userBill=value.find((a:any)=>{
        return a.phone===billData.mobileNo
      });
      if(userBill){
        this.showPatientBill=userBill;
        this.sendToPatient(userBill, billData)
        // this.patchToPatient(userBill);
      }
    })
  }
  showPatientBillObj : ShowBillToPatient = new ShowBillToPatient();
  sendToPatient(userId:any, billData:any){
    var cost={
      "doctorName":billData.doctorName,
      "consultingFee":billData.consultingFee,
      "otherFee":billData.otherFee,
      "Total":billData.Total,
      "appointmentDate":billData.appointmentDate
    }

    // ------ This is a another Method to collet the data using the seperate ts class and use it-------

    // this.showPatientBillObj.consultingFee=this.generateBillDetailsObj.consultingFee;
    // this.showPatientBillObj.otherFee=this.generateBillDetailsObj.otherFee;
    // this.showPatientBillObj.Total=this.generateBillDetailsObj.Total;
    this.generateBills.updatePatientRegistration(cost,userId.id).subscribe(()=>{
      alert("Updated to PatientRegister");
    });
    var val={
      appStatus:"Payment Pending"
    }
    this.http.patch<any>(environment.getPatientRegistrationDetails+userId.id,val).subscribe(()=>{
      alert("Appomitment Status Updated");
    })
    var body={
      status:"sended to patient"
    }
    this.http.patch<any>(environment.getBillDetails+billData.id,body).subscribe(()=>{
      alert("Patched to billDetails DB ")
      this.ngOnInit();
    });
  }

  deleteGenerate(value:any){
    this.generateBills.deleteGeneratedBills(value).subscribe(data=>{
      this.ngOnInit();
    })
  }

  }
