import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { AppointmentCancelService } from '../appointmentCancel.service';
import { UserServiceService } from '../userService.service';

@Component({
  selector: 'app-view-slot',
  templateUrl: './view-slot.component.html',
  styleUrls: ['./view-slot.component.css']
})
export class ViewSlotComponent {
  constructor(private http:HttpClient,private userService:UserServiceService, private service:AppointmentService, private cancelService:AppointmentCancelService) { }
  getAppointment:any="";


  ngOnInit() {
    this.http.get<any>("http://localhost:3000/appointmentDetails").subscribe(data=>{
      this.getAppointment=data;
    })
  }
  date:any=new Date();
  // isDisableAccept:any=false;
  // isHiddenAccept:any=false;
  // isDisableCancel:any=false;
  // isHiddenCancel:any=false;

  accept(id: number){
    alert("This slot is conformed");
  }
  cName:any=""
  cMobileNo:any=""
  cDate:any=""
  doctorName:any=""
  cancel(cancelId: number, cancelName: any, cancelMobileNo: any, cancelDate: any, docName:any){
    // this.postCancelDetails(cancelName, cancelMobileNo, cancelDate);
    this.cName=cancelName;
    this.cMobileNo=cancelMobileNo;
    this.cDate=cancelDate;
    this.doctorName=docName;
    // this.postCancelDetails();
    this.service.deleteAppointment(cancelId).subscribe(()=>{
      alert("Cancelled"+cancelId);
      this.ngOnInit();
    });
    this.postCancelDetails();
  }
  postCancelDetails(){
    var body={
          cName:this.cName,
          cMobileNo:this.cMobileNo,
          cDate:this.cDate,
          octorName:this.doctorName
        }
  this.cancelService.postCancelledRequest(body).subscribe(value=>{
  });
  }

}
