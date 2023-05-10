import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetLoginService } from '../getLogin.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgotPassword',
  templateUrl: './forgotPassword.component.html',
  styleUrls: ['./forgotPassword.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private fb:FormBuilder, private router:Router,
    private forgotDetails:GetLoginService,
    private http:HttpClient) { }
  forgotForm =this.fb.group({
    userId:[,[Validators.required]]
  })
status:boolean=false;
  proceed(){
    if(this.forgotForm.valid){
      this.http.get<any>("http://localhost:3000/forgotPassDetails").subscribe(data=>{
        const compare=data.find((a:any)=>{
          return a.userId===this.forgotForm.value.userId;
        });
        if(compare){
          alert("Already Sended");
        }
        else{
          this.forgotDetails.postForgotPasswordDetails(this.forgotForm.value).subscribe(value=>{
            alert("Updated on DB");
          });
        }
      })
    this.router.navigate(['login'])
  }


    // else{
    //   alert("Enter the Email");
    // }
  }
  ngOnInit() {
  }

}
