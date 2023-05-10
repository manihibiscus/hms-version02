import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetLoginService } from '../getLogin.service';

@Component({
  selector: 'app-forgotPassword',
  templateUrl: './forgotPassword.component.html',
  styleUrls: ['./forgotPassword.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private fb:FormBuilder, private router:Router, private forgotDetails:GetLoginService) { }
  forgotForm =this.fb.group({
    userId:[,[Validators.required]]
  })
status:boolean=false;
  proceed(){
    if(this.forgotForm.valid){
      this.status=true;
    alert("Check your Mail Box");
    this.forgotDetails.postForgotPasswordDetails(this.forgotForm.value).subscribe(value=>{
      alert("Updated on DB");
    });
    this.router.navigate(['login'])

    }
    // else{
    //   alert("Enter the Email");
    // }
  }
  ngOnInit() {
  }

}
