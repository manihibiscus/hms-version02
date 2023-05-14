import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactServiceService } from '../contactService.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contactUsPage',
  templateUrl: './contactUsPage.component.html',
  styleUrls: ['./contactUsPage.component.css']
})
export class ContactUsPageComponent implements OnInit {

  constructor(private contactService:ContactServiceService) { }
  // querySubmit=this.fb.group({
  //   email:[,[Validators.required]],
  //   name:[,[Validators.required]],
  //   message:[,[Validators.required]]
  // })

  @ViewChild('queryForm') queryForm!: NgForm; // You can also initialize the property with a default value, like this

  // @ViewChild('queryForm') queryForm: NgForm = {} as NgForm;

  //  You can also initialize the property with a default value, like this



  email:any="";
  contactName:any="";
  message:any="";
  mobile:any=""
  datum:any="";

  submitQuery(){
    var body={
      emailId:this.email,
      name:this.contactName,
      mobile:this.mobile,
      queryMessage:this.message
    }
    this.contactService.postQueryDetails(body).subscribe(data=>{
      alert("Query Form Submitted Successfully!");
      this.queryForm.reset();

    })
  }
  ngOnInit() {

  }
  query(){

  }
}
