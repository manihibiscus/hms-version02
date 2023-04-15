import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-view-slot',
  templateUrl: './view-slot.component.html',
  styleUrls: ['./view-slot.component.css']
})
export class ViewSlotComponent {
  constructor(private http:HttpClient) { }
  getAppointment:any="";
  

  ngOnInit() {
    this.http.get<any>("http://localhost:3000/appointmentDetails").subscribe(data=>{
      this.getAppointment=data;
    })
  }
  date:any=new Date();
  isDisableAccept:any=false;
  isHiddenAccept:any=false;
  isDisableCancel:any=false;
  isHiddenCancel:any=false;

  accept(){
    alert("This slot is conformed");
    this.isDisableAccept=true;
    this.isHiddenAccept=true;
  }
  cancel(){
    this.isDisableCancel=true;
    this.isHiddenCancel=true;
    alert("this slot is canceled");
  }
}
