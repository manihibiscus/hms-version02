import { Component } from '@angular/core';
import { ContactServiceService } from '../contactService.service';
import { GenerateBillsService } from './generateBills.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenerateBills } from './generateBills.model';

@Component({
  selector: 'app-generate-bills',
  templateUrl: './generate-bills.component.html',
  styleUrls: ['./generate-bills.component.css']
})
export class GenerateBillsComponent {
  dateNow : Date=new Date()
  constructor(private service:GenerateBillsService, private fb:FormBuilder) { }
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
  sum(){
    // let a=this.billForm.controls['consultingFee'].value;
    // let b=this.billForm.controls['otherFee'].value;
    // this.billForm.valueChanges.subscribe(() => {
    //   this.total =parseInt(a)+
    // });
  }
  generate(row:any){
    this.billForm.controls['patinetName'].setValue(row.name);
    this.billForm.controls['doctorName'].setValue(row.doctorName);
    this.billForm.controls['doctorField'].setValue(row.doctorField);
    this.billForm.controls['contactNo'].setValue(row.mobileNo);
  }


}
