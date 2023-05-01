import { Component, OnInit } from '@angular/core';
import { DoctorDetailsService } from '../doctorDetails.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-generalDoctor',
  templateUrl: './generalDoctor.component.html',
  styleUrls: ['./generalDoctor.component.css']
})
export class GeneralDoctorComponent implements OnInit {

  constructor(private doctorDetails:DoctorDetailsService, private http:HttpClient, private route:ActivatedRoute ) { }
  generalDocDet:any="";
  SearchFor:any="";
  final:any=this.doctorDetails.store;
  ngOnInit() {
    // this.doctorDetails.getGeneralDoctorDetails().subscribe(data=>{
    //   this.generalDocDet=data
    // })
    this.http.get<any>("http://localhost:3000"+'/'+this.final).subscribe((data:any)=>{
      this.generalDocDet=data;
      this.route.params.subscribe(paramdata=>{
        this.SearchFor=paramdata['check'];
    })
  })
}

}
