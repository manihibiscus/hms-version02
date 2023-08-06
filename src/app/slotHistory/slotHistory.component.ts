import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GenerateBillsService } from '../generate-bills/generateBills.service';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-slotHistory',
  templateUrl: './slotHistory.component.html',
  styleUrls: ['./slotHistory.component.css']
})
export class SlotHistoryComponent implements OnInit {

  constructor(private http:HttpClient, private generateBills:GenerateBillsService) { }
  canceledAppointment:any="";
  acceptedAppointment:any="";
  getReceipterDetails:any="";
  getUnpaidList:any="";
  getPaidList:any="";
  ngOnInit() {
    this.http.get<any>(environment.getCancelledRequestDetails).subscribe(cancelDate=>{
    this.canceledAppointment=cancelDate;
  });
  this.http.get<any>(environment.getAcceptRequestDetails).subscribe(acceptDate=>{
    this.acceptedAppointment=acceptDate;
  });
  this.generateBills.getBillDetails().subscribe(value=>{
    this.getReceipterDetails=value
  });

  this.searchUpdaid().subscribe((unpaid)=>{
    this.getUnpaidList=unpaid
  });
  this.searchPaid().subscribe((paid)=>{
    this.getPaidList=paid
  })

}
  searchUpdaid(): Observable<any> {
    return this.http.get<any>(environment.getBillDetails).pipe(
      map((data) => {
        return data.filter(
          (item:any) =>
            item.paymentStatus === "Unpaid"
        );
      })
    );
  }
  searchPaid(): Observable<any> {
    return this.http.get<any>(environment.getBillDetails).pipe(
      map((data) => {
        return data.filter(
          (item:any) =>
            item.paymentStatus === "Paid"
        );
      })
    );
  }
  showCancel:any="false"
  showAccept:any="false"
  showPending:any="false"
  showSuccess:any="false"
  showImage:any="true"
  cancel(){
    this.showCancel="true";
    this.showAccept="false";
    this.showPending="false";
    this.showSuccess="false";
    this.showImage="false"

  }
  accept(){
    this.showCancel="false";
    this.showAccept="true";
    this.showPending="false";
    this.showSuccess="false";
    this.showImage="false"

  }
  paymentPending(){
    this.showCancel="false";
    this.showAccept="false";
    this.showPending="true";
    this.showSuccess="false";
    this.showImage="false"

  }
  paymentSuccess(){
    this.showCancel="false";
    this.showAccept="false";
    this.showPending="false";
    this.showSuccess="true";
    this.showImage="false"

  }
}
