import { Component, OnInit } from '@angular/core';
import { DoctorDetailsService } from '../doctorDetails.service';
import { medicalFieldImages } from 'src/environments/environment.development';

@Component({
  selector: 'app-medialSpecPage',
  templateUrl: './medialSpecPage.component.html',
  styleUrls: ['./medialSpecPage.component.css']
})
export class MedialSpecPageComponent implements OnInit {

  mediacalFieldImg=medicalFieldImages
  constructor(private service:DoctorDetailsService) { }

  ngOnInit() {
  }
  general(){
    this.service.store="Gendral Ward";
    sessionStorage.setItem('field', JSON.stringify(this.service.store))
  }
  pediatrician(){
    this.service.store="Pediatrician";
    sessionStorage.setItem('field', JSON.stringify(this.service.store))
  }
  gynecologist(){
    this.service.store="Gynecologist";
    sessionStorage.setItem('field', JSON.stringify(this.service.store))
  }
  dental(){
    this.service.store="Dentist";
    sessionStorage.setItem('field', JSON.stringify(this.service.store))
  }
  cardiologist(){
    this.service.store="Cardiology";
    sessionStorage.setItem('field', JSON.stringify(this.service.store))
  }
  cosmetic(){
    this.service.store="Cosmic Surgery";
    sessionStorage.setItem('field', JSON.stringify(this.service.store))
  }
  otolaryngologist(){
    this.service.store="Otolaryngologist - ENT";
    sessionStorage.setItem('field', JSON.stringify(this.service.store))
  }
  psychiatrist(){
    this.service.store="Psychiatrist";
    sessionStorage.setItem('field', JSON.stringify(this.service.store))
  }
}
