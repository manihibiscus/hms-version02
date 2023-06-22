import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'version-02';
  // bookedTimeSlots: string[] = []; // Example of booked time slots
  // selectedTimeSlot!: string;

  // availableTimeSlots: string[] = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM']; // Example of all time slots

  // getFilteredTimeSlots(): string[] {
  //   // Filter out the booked time slots from the available time slots
  //   return this.availableTimeSlots.filter(slot => !this.bookedTimeSlots.includes(slot));
  // }
}
