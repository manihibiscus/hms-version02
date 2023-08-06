import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../userService.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-doctorPage',
  templateUrl: './doctorPage.component.html',
  styleUrls: ['./doctorPage.component.css']
})
export class DoctorPageComponent implements OnInit {
  loggedInUser:any="";
  constructor(private userServeice:UserServiceService, private route: Router,private http:HttpClient) { }
  patient:any=""
  ngOnInit() {
    const sessionUser = sessionStorage.getItem('loggedInUser'); // <-- retrieve user details from session storage
    if (sessionUser) {
      this.loggedInUser = JSON.parse(sessionUser);
    } else if (this.userServeice.loggedInUser !== null) {
      this.loggedInUser = this.userServeice.loggedInUser;
    } else {
      alert('You are Loggedout. Login to continue');
      this.route.navigate(['/login']);
    }
    this.http.get<any>(environment.getAcceptRequestDetails).subscribe((data)=>{
        this.patient=data
    })
  }

}
