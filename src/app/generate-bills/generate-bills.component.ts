import { Component } from '@angular/core';
import { ContactServiceService } from '../contactService.service';
import { GenerateBillsService } from './generateBills.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenerateBills } from './generateBills.model';
import { HttpClient } from '@angular/common/http';

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
  result!:number
  sum(value1:string, value2:string){
   this.result=parseInt(value1)+parseInt(value2)
    // alert(this.result);
  }
  generate(row:any){
    this.billForm.controls['patinetName'].setValue(row.name);
    this.billForm.controls['doctorName'].setValue(row.doctorName);
    this.billForm.controls['doctorField'].setValue(row.doctorField);
    this.billForm.controls['contactNo'].setValue(row.mobileNo);
  }
  submitBill(){
    this.generateBillDetailsObj.name=this.billForm.value.patinetName;
    this.generateBillDetailsObj.doctorName=this.billForm.value.doctorName;
    this.generateBillDetailsObj.doctorField=this.billForm.value.doctorField;
    this.generateBillDetailsObj.mobileNo=this.billForm.value.contactNo;
    this.generateBillDetailsObj.consultingFee='₹'+this.billForm.value.consultingFee;
    this.generateBillDetailsObj.otherFee= '₹'+this.billForm.value.otherFee;
    this.generateBillDetailsObj.Total='₹'+this.result;
    this.generateBills.postBillDetails(this.generateBillDetailsObj).subscribe(res=>{
      alert("Generarted");
    })
  }


}
