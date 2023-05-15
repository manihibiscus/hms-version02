import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../userService.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminHeader',
  templateUrl: './adminHeader.component.html',
  styleUrls: ['./adminHeader.component.css']
})
export class AdminHeaderComponent implements OnInit {

  constructor(private user:UserServiceService,private http:HttpClient,private route:Router) { }

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
