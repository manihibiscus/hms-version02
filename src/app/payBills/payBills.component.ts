import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../userService.service';
import { Router } from '@angular/router';

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
  constructor(private userServeice:UserServiceService, private route:Router) { }

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
  }
  pay(user:any){
alert(user.Total)
  }

}
