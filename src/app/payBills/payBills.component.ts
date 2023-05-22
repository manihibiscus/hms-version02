import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../userService.service';
import { Router } from '@angular/router';
import { PatientServiceService } from '../patientPage/patientService.service';
import { FormBuilder } from '@angular/forms';
import { BillServiceService } from './billService.service';

@Component({
  selector: 'app-payBills',
  templateUrl: './payBills.component.html',
  styleUrls: ['./payBills.component.css']
})
export class PayBillsComponent implements OnInit {

  // constructor(private http:HttpClient) { }

  // getPaymentDetails:any=""
  // ngOnInit() {
  //   this.http.get<any>("http://localhost:3000/patientRegistration").subscribe((data)=>{
  //       this.getPaymentDetails=data;
  //   })
  // }
  // pay(value1:any, value2:any){

  // }
  loggedInUser:any=""
  refereshData:any=""
  historyPayment:any=""
  baseUrl:any="http://localhost:3000"
  showStatus:any="true"
  history:any=""
  constructor(private userServeice:UserServiceService, private route:Router,private fb:FormBuilder,
    private http:HttpClient, private service:BillServiceService) { }

  ngOnInit() {
    const sessionUser = sessionStorage.getItem('loggedInUser'); // <-- retrieve user details from session storage
    if (sessionUser) {
      this.loggedInUser = JSON.parse(sessionUser);
    }
    else if (this.userServeice.loggedInUser !== null) {
      this.loggedInUser = this.userServeice.loggedInUser;
    } else {
      alert('You are Loggedout. Login to continue');
      this.route.navigate(['/login']);
    }

    this.http.get<any>("http://localhost:3000/patientRegistration").subscribe(data=>{
        const value=data.find((a:any)=>{
          return a.email===this.loggedInUser.email
        })
        if(value){
          this.refereshData=value
        }
    });
    this.http.get<any>("http://localhost:3000/paymentHistory").subscribe(val=>{
        const history=val.find((b:any)=>{
          return b.email===this.loggedInUser.email
        })
        if(history){
          this.historyPayment=history
        }
    });
    this.service.searchPayment(this.loggedInUser.phone).subscribe((value)=>{
      this.history=value;
    })

  }

  paying=this.fb.group({
    totalPay:[,]
  })

  pay(user:any){
    var body={
      patientName:user.patientName,
      email:user.email,
      phone:user.phone,
      appointmentDate:user.appointmentDate,
      doctorField:user.doctorField,
      doctorName:user.doctorName,
      consultingFee:user.consultingFee,
      otherFee:user.otherFee,
      Total:user.Total,
      paymentStatus:"Success"
    }
    this.http.post<any>("http://localhost:3000/paymentHistory", body).subscribe(data=>{
      alert("Posted to payHistory DB");
      // this.showStatus="true";
    });
    this.unPaid()
  }

  // Send the message to ADMIN
  unPaid(){
    this.http.get<any>("http://localhost:3000/patientRegistration").subscribe((get)=>{
      const getting=get.find((b:any)=>{
        return this.loggedInUser.phone==b.phone
      })
      if(getting){
        this.compare(getting)
      }
    })
  }
  compare(value:any){
    this.http.get<any>("http://localhost:3000/billDetails").subscribe((val)=>{
      const findId=val.find((a:any)=>{
        this.ngOnInit
        return (a.mobileNo===value.phone && a.appointmentDate===value.appointmentDate && a.Total===value.Total)
      });
      if(findId){
        this.paid(findId);
      }
    });
  }
  paid(findId:any){
    var body={
      paymentStatus:"Paid"
    }
    this.http.patch<any>("http://localhost:3000/billDetails/"+findId.id,body).subscribe(()=>{
      alert("Paided to admin");
      this.sample();

    })
  }
  sample(){
    var value={
      appointmentDate:"",
      doctorField:"",
      doctorName:"",
      consultingFee:"",
      otherFee:"",
      Total:"",
      attemptStatus:"false",
      appointmentTime:"",
      appStatus:"",
      remarkMessage:""
    }
    // this.http.get<any>("http://localhost:3000/paymentHistory").subscribe(data1=>{
    //   const patientFind=data1.find((a:any)=>{
    //     return a.phone== user.phone;
    //   });
    //   if(patientFind){
    //     this.historyPayment=patientFind;
        this.http.patch<any>(`${this.baseUrl}/patientRegistration/${this.loggedInUser.id}`,value).subscribe(()=>{
          alert("Updated to Patient DB");
          this.ngOnInit();
        })
    //   }
    // })
  }
}
