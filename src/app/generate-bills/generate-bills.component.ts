import { Component } from '@angular/core';
import { ContactServiceService } from '../contactService.service';
import { GenerateBillsService } from './generateBills.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenerateBills } from './generateBills.model';
import { HttpClient } from '@angular/common/http';
import { empty } from 'rxjs';

@Component({
  selector: 'app-generate-bills',
  templateUrl: './generate-bills.component.html',
  styleUrls: ['./generate-bills.component.css']
})
export class GenerateBillsComponent {
  dateNow : Date=new Date();
  otherFee:any="";
  conFee: number = parseFloat(this.otherFee);

  constructor(private service:GenerateBillsService, private fb:FormBuilder, private generateBills:GenerateBillsService) { }
  getBills:any="";
  genereateBills:any=""
  billForm=this.fb.group({
    patientId:[,[Validators.required] ],
    patinetName:[,[Validators.required] ],
    doctorName:[,[Validators.required]],
    doctorField:[,[Validators.required]],
    contactNo:[,[Validators.required]],
    consultingFee:[,[Validators.required]],
    otherFee:[,[Validators.required]]
  })

  generateBillDetailsObj : GenerateBills=new GenerateBills()
  total:any=0;
  ngOnInit() {
    this.service.getAcceptRequest().subscribe(data=>{
      this.getBills=data
    });

  }
  result!:number | null
  sum(value1:string, value2:string){
   this.result=parseInt(value1)+parseInt(value2)
    // alert(this.result);
  }
  generate(row:any){
    this.billForm.controls['patientId'].setValue(row.id);
    this.billForm.controls['patinetName'].setValue(row.name);
    this.billForm.controls['doctorName'].setValue(row.doctorName);
    this.billForm.controls['doctorField'].setValue(row.doctorField);
    this.billForm.controls['contactNo'].setValue(row.mobileNo);
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
    let ref=document.getElementById("ref");
    ref?.click();
    this.generateBills.postBillDetails(this.generateBillDetailsObj).subscribe(res=>{
      alert("Generarted");
    })
    this.deleteGenerate(this.generateBillDetailsObj.patientId);
    this.billForm.reset();
    this.result=null;

  }
  deleteGenerate(value:any){
    this.generateBills.deleteGeneratedBills(value).subscribe(data=>{
      this.ngOnInit();
    })
  }


}
