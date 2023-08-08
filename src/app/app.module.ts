import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContactUsPageComponent } from './contactUsPage/contactUsPage.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { HttpClientModule} from '@angular/common/http';
import { GeneralDoctorComponent } from './generalDoctor/generalDoctor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientRegistrationComponent } from './patientRegistration/patientRegistration.component';
import { AdminHeaderComponent } from './adminHeader/adminHeader.component';
import { AdminPageComponent } from './adminPage/adminPage.component';
import { PatientHeaderComponent } from './patientHeader/patientHeader.component';
import { PatientPageComponent } from './patientPage/patientPage.component';
import { DoctorHeaderComponent } from './doctorHeader/doctorHeader.component';
import { AppointmentRequestComponent } from './appointmentRequest/appointmentRequest.component';
import { ViewQueryComponent } from './viewQuery/viewQuery.component';
import { ViewSlotComponent } from './view-slot/view-slot.component';
import { GenerateBillsComponent } from './generate-bills/generate-bills.component';
import { SlotComponent } from './slot/slot.component';
import { PayBillsComponent } from './payBills/payBills.component';
import { ForgotPasswordComponent } from './forgotPassword/forgotPassword.component';
import { ConformationGuard } from './conformation.guard';
import { CurrencyPipe } from './currency.pipe';
import { SlotHistoryComponent } from './slotHistory/slotHistory.component';
import { PatientHistoryComponent } from './patientHistory/patientHistory.component';
import { BmiCalcularPipe } from './bmi-calcular.pipe';
import { DoctorViewHistoryComponent } from './doctorViewHistory/doctorViewHistory.component';
import { LoggerModule, NgxLoggerLevel } from "ngx-logger";

@NgModule({
  declarations: [
    AppComponent,
      ContactUsPageComponent,
      HeaderComponent,
      FooterComponent,
      routingComponents,
      GeneralDoctorComponent,
      PatientRegistrationComponent,
      AdminHeaderComponent,
      AdminPageComponent,
      PatientHeaderComponent,
      PatientPageComponent,
      DoctorHeaderComponent,
      AppointmentRequestComponent,
      ViewQueryComponent,
      ViewSlotComponent,
      GenerateBillsComponent,
      SlotComponent,
      PayBillsComponent,
      ForgotPasswordComponent,
      CurrencyPipe,
      SlotHistoryComponent,
      PatientHistoryComponent,
      BmiCalcularPipe,
      DoctorViewHistoryComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LoggerModule.forRoot({
      serverLoggingUrl: 'http://localhost:3000/',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR
    })
    ],
  providers: [ConformationGuard],
  bootstrap:[AppComponent]
})
export class AppModule { }

