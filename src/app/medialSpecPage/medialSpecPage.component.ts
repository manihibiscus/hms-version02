import { Component, OnInit } from '@angular/core';
import { DoctorDetailsService } from '../doctorDetails.service';

@Component({
  selector: 'app-medialSpecPage',
  templateUrl: './medialSpecPage.component.html',
  styleUrls: ['./medialSpecPage.component.css']
})
export class MedialSpecPageComponent implements OnInit {

  constructor(private service:DoctorDetailsService) { }

  ngOnInit() {
  }
  general(){
    this.service.store="generalDoctorList";
  }
  pediatrician(){
    this.service.store="pediatricianList";
  }
  gynecologist(){
    this.service.store="gynecologist";
  }
  dental(){
    this.service.store="dentist";

  }
  cardiologist(){
    this.service.store="cardiologist";
  }
  cosmetic(){
    this.service.store="cosmic";
  }
  otolaryngologist(){
    this.service.store="otolaryngologist";
  }
  psychiatrist(){
    this.service.store="psychiatrist";
  }
}
