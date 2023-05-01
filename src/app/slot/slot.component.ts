import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../userService.service';

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.css']
})
export class SlotComponent implements OnInit {

  constructor(private http:HttpClient,private service:UserServiceService) { }
  // status:any=this.service.viewStatus;
  slotAllocated:any=""
  ngOnInit() {
    this.http.get<any>("http://localhost:3000/appointmentDetails").subscribe(data=>{
    this.slotAllocated=data;
    // alert(this.status)
    })
  }

}
