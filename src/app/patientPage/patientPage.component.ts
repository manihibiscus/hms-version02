import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../userService.service';

@Component({
  selector: 'app-patientPage',
  templateUrl: './patientPage.component.html',
  styleUrls: ['./patientPage.component.css']
})
export class PatientPageComponent implements OnInit {
  loggedInUser:any=""
  constructor(private userServeice:UserServiceService, private route:Router) { }

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
  }
  }


