import { Component, OnInit } from '@angular/core';
import { DoctorDetailsService } from '../doctorDetails.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

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
  check:any=""
  storing:any=""
  ngOnInit() {
    // this.doctorDetails.getGeneralDoctorDetails().subscribe(data=>{
    //   this.generalDocDet=data
    // })
    const data=sessionStorage.getItem('field')  ;
    if(data){
      this.storing= JSON.parse(data);
    }
  this.http.get<any>(environment.getInfrastructureDetails).subscribe(value=>{
      const choose=value.find((item:any)=>{
        return item.topic === this.storing
      });
      if(choose){
        this.check=choose;
        this.route.params.subscribe(paramdata=>{
          this.SearchFor=paramdata['check'];
        })
      }
  })
}

}
