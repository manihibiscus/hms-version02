import { Component, OnInit } from '@angular/core';
import { AddDetailsService } from '../addDetails.service';
import { DetailsService } from '../details.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: [`input.ng-invalid{border:5px solid red}
      input.ng-valid{border:5px solid green}`]
})

export class FormComponent implements OnInit {

  username:any="";
  mobileno: any="";
  emailid: any="";
  constructor(private userService:DetailsService) { }
  submitForm(){
    var body={
      user:this.username,
      mobileno:this.mobileno,
      email:this.emailid
    }
    this.userService.addUserInformation(body).subscribe(data=>{
      alert("Form Submitted!!!")
    })
    }

  ngOnInit() {

  }

}
