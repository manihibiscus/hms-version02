import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../userService.service';
import { PatientPageComponent } from '../patientPage/patientPage.component';
import { PatientServiceService } from '../patientPage/patientService.service';


@Component({
  selector: 'app-patientHeader',
  templateUrl: './patientHeader.component.html',
  styleUrls: ['./patientHeader.component.css']
})
export class PatientHeaderComponent implements OnInit  {

  constructor(private route:Router, private user:UserServiceService,
    private patService:PatientServiceService) { }
    ngOnInit(): void{

    }
  patientObj!:PatientPageComponent;
  // statusValue:boolean=false;
  // @ViewChild(PatientPageComponent) componentA!: PatientPageComponent;
  // logout(){
    // this.patService.logoutStatus=true;
    // alert('You are Loggedout'+this.patService.logoutStatus);
    // this.patientObj.ngOnInit();
    // this.route.navigate(['/login']);

  // }
  logout() {
    // confirm('Are you sure to logout');

    this.user.loggedInUser = null;

    sessionStorage.removeItem('loggedInUser');
    alert('You are logout succussfully');
    // Navigate back to the login page
    this.route.navigate(['/login']);
  }
}
