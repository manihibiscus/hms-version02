import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BillServiceService } from '../payBills/billService.service';
import { DoctorViewServiceService } from './doctorViewService.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-doctorViewHistory',
  templateUrl: './doctorViewHistory.component.html',
  styleUrls: ['./doctorViewHistory.component.css']
})
export class DoctorViewHistoryComponent implements OnInit {

  constructor(private http:HttpClient,
    private bill:BillServiceService,
    private service:DoctorViewServiceService,
   ) { }


  loggedUser:any="";
  cancelled:any="";
  completed:any="";
  history:any="";
  ngOnInit() {
    let sessionUser = sessionStorage.getItem('loggedInUser');
    if (sessionUser) {
      this.loggedUser = JSON.parse(sessionUser);
      // this.refresh(sessionUser);
    }
    this.service.searchCancel(this.loggedUser.doctorName).subscribe((value)=>{
      this.cancelled=value
    });
    this.service.searchAccept(this.loggedUser.doctorName).subscribe((data1)=>{
      this.completed=data1;
    });
    this.getDoctorProfile()
}
storeField:any="";
storedField:any="";
getDoctorProfile(){
  if(this.loggedUser.field=="General doctor"){
    this.storeField="generalDoctorList";
    this.activateDb();
  }
  else if(this.loggedUser.field=="Pediatrician"){
    this.storeField="pediatricianList";
    this.activateDb();
  }
  else if(this.loggedUser.field=="Gynecologist"){
    this.storeField="gynecologist";
    this.activateDb();
  }
  else if(this.loggedUser.field=="Dentist"){
    this.storeField="dentist";
    this.activateDb();
  }
  else if(this.loggedUser.field=="Cardiologist"){
    this.storeField="cardiologist";
    this.activateDb();
  }
  else if(this.loggedUser.field=="Cosmic"){
    this.storeField="cosmic";
    this.activateDb();
  }
  else if(this.loggedUser.field=="Otolaryngologist"){
    this.storeField="otolaryngologist";
    this.activateDb();
  }
  else if(this.loggedUser.field=="Psychiatrist"){
    this.storeField="psychiatrist";
    this.activateDb();
  }
}
activateDb(){
  this.http.get<any>(environment.getUrl+this.storeField).subscribe(data=>{
    var value=data.find((item:any)=>{
      return item.doctorName===this.loggedUser.doctorName
    });
    if(value){
      this.storedField=value;
    }
  })
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
    var ref=document.getElementById("back");
    ref?.click();
  }
  accept(){
    this.showCancel="false";
    this.showAccept="true";
    this.showPending="false";
    this.showSuccess="false";
    this.showImage="false"
    var ref=document.getElementById("back");
    ref?.click();
  }

  profile(){
    this.showCancel="false";
    this.showAccept="false";
    this.showPending="false";
    this.showSuccess="false";
    this.showImage="true"
    var ref=document.getElementById("back");
    ref?.click();
  }

}
