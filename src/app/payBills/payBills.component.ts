import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../userService.service';
import { Router } from '@angular/router';
import { PatientServiceService } from '../patientPage/patientService.service';

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
  constructor(private userServeice:UserServiceService, private route:Router,
    private http:HttpClient) { }

  ngOnInit() {
    const sessionUser = sessionStorage.getItem('loggedInUser'); // <-- retrieve user details from session storage
    if (sessionUser) {
      this.loggedInUser = JSON.parse(sessionUser);
    }

    // else if (this.userServeice.loggedInUser !== null) {
    //   this.loggedInUser = this.userServeice.loggedInUser;
    // } else {
    //   alert('You are Loggedout. Login to continue');
    //   this.route.navigate(['/login']);
    // }
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

  }
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
    this.sample(user);

  }
  sample(user:any){
    var value={
      appointmentDate:"",
      doctorField:"",
      doctorName:"",
      consultingFee:"",
      otherFee:"",
      Total:"",
      attemptStatus:"false",
      appointmentTime:"",
      appStatus:""
    }
    // this.http.get<any>("http://localhost:3000/paymentHistory").subscribe(data1=>{
    //   const patientFind=data1.find((a:any)=>{
    //     return a.phone== user.phone;
    //   });
    //   if(patientFind){
    //     this.historyPayment=patientFind;
        this.http.patch<any>(`${this.baseUrl}/patientRegistration/${user.id}`,value).subscribe(()=>{
          alert("Updated to Patient DB");
          this.ngOnInit();
        })
    //   }
    // })
  }
}
