import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserServiceService } from '../userService.service';

@Component({
  selector: 'app-doctorHeader',
  templateUrl: './doctorHeader.component.html',
  styleUrls: ['./doctorHeader.component.css']
})
export class DoctorHeaderComponent implements OnInit {

  constructor(private route:Router, private user:UserServiceService) { }

  ngOnInit() {
  }
  logout() {
    // confirm('Are you sure to logout');

    this.user.loggedInUser = null;

    sessionStorage.removeItem('loggedInUser');
    alert('You are logout succussfully');
    // Navigate back to the login page
    this.route.navigate(['/login']);
  }
}
