import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHeaderComponent } from './adminHeader/adminHeader.component';
import { AdminPageComponent } from './adminPage/adminPage.component';
import { AppointmentRequestComponent } from './appointmentRequest/appointmentRequest.component';
import { ContactUsPageComponent } from './contactUsPage/contactUsPage.component';
import { DoctorPageComponent } from './doctorPage/doctorPage.component';
import { GeneralDoctorComponent } from './generalDoctor/generalDoctor.component';

import { HomePageComponent } from './homePage/homePage.component';
import { LoginPageComponent } from './loginPage/loginPage.component';
import { MedialSpecPageComponent } from './medialSpecPage/medialSpecPage.component';
import { PatientPageComponent } from './patientPage/patientPage.component';
import { PatientRegistrationComponent } from './patientRegistration/patientRegistration.component';
import { ViewQueryComponent } from './viewQuery/viewQuery.component';
import { ViewSlotComponent } from './view-slot/view-slot.component';
import { GenerateBillsComponent } from './generate-bills/generate-bills.component';
import { SlotComponent } from './slot/slot.component';
import { PayBillsComponent } from './payBills/payBills.component';
import { ForgotPasswordComponent } from './forgotPassword/forgotPassword.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  {
    path: 'medicalSpec',
    component: MedialSpecPageComponent,
  },

  {
    path: 'medicalSpec/:check',
    component: GeneralDoctorComponent,
  },

  {
    path: 'medicalSpec/cosmetic',
    component: GeneralDoctorComponent,
  },

  {
    path: 'home',
    component: HomePageComponent,
  },

  {
    path: 'login',
    component: LoginPageComponent,
  },

  // {
  //   path:"general",
  //   component:GeneralDoctorComponent
  // },

  {
    path: 'contact',
    component: ContactUsPageComponent,
  },
  {
    path:'adminhome',
    component:AdminPageComponent
  },
  // {
  //   path:'logout',
  //   component:HomePageComponent
  // },
{
  path:'viewQuery',
component:ViewQueryComponent
},
{
  path:'patienthome',
  component:PatientPageComponent
},
{
  path:"doctorhome",
  component:DoctorPageComponent
},
{
  path:"patientregister",
  component:PatientRegistrationComponent
},
{
  path:"appointment",
  component:AppointmentRequestComponent
},
{
  path:"requestSlot",
  component:ViewSlotComponent
},
{
  path:"generateBills",
  component:GenerateBillsComponent
},
{
  path:"slot",
  component:SlotComponent
},
{
  path:"payBills",
  component:PayBillsComponent
},
{
  path:"forgotPassword",
  component:ForgotPasswordComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const routingComponents = [
  MedialSpecPageComponent,
  HomePageComponent,
  LoginPageComponent,
]

