import { Component, OnInit } from '@angular/core';
import { TimingService } from './timing.service';
import { count } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment, homePageImages } from 'src/environments/environment.development';

@Component({
  selector: 'app-homePage',
  templateUrl: './homePage.component.html',
  styleUrls: ['./homePage.component.css']
})
export class HomePageComponent implements OnInit {

  homePageImg:any=homePageImages
  constructor(private service:TimingService, private http:HttpClient) { }
//   interval:any=setInterval(()=>{
//     this.closepopup();
//     },5000)
cancel:boolean=false;
eventTitile:any="";
con1:any="";
con2:any="";
link:any="";
flash:boolean=false;
blur:boolean=false;
// calculate = new Date("Jun 16,2023 18:30:00").getDate();
getEvent:any=""
  ngOnInit(){
var nowDate=new Date().getDate();
var nowMonth=new Date().getMonth()
// var dis=this.calculate-now;
// alert(nowMonth)
this.http.get<any>(environment.getEventDetails).subscribe((data)=>{
  const event=data.find((a:any)=>{
    var eventDate=new Date(a.date).getDate();
    var eventMonth=new Date(a.date).getMonth();
    return eventDate==nowDate && eventMonth==nowMonth
  });
  if(event){
this.open(event);
  }
})

  }
  open(event:any){
      this.flash=true
      this.blur=true
      this.link=event.link
      this.eventTitile=event.eventName
      this.con1=event.content1;
      this.con2=event.content2;
      this.content2(event);
  }
  content2(event:any){
    setInterval(()=>{
      this.con1=event.content3;
      this.con2=event.content4;
      this.service.counting=2;
      this.close();
    },4000);
  }

  close(){
    setInterval(()=>{
      this.flash=false;
      this.blur=false;
    },4000)
}
closeBanner(){
  this.flash=false;
  this.blur=false;
}
}
