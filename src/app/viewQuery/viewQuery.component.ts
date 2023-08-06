import { Component, OnInit } from '@angular/core';
import { ContactServiceService } from '../contactService.service';
import { UserServiceService } from '../userService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewQuery',
  templateUrl: './viewQuery.component.html',
  styleUrls: ['./viewQuery.component.css']
})
export class ViewQueryComponent implements OnInit {

  constructor(private service:ContactServiceService,
    private userServeice:UserServiceService,
    private route:Router) { }
  getQuery:any="";
  loggedInUser:any="";

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
    this.service.getQueryDetails().subscribe(data=>{
      this.getQuery=data
    })
  }

}
