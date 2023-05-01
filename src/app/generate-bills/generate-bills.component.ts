import { Component } from '@angular/core';
import { ContactServiceService } from '../contactService.service';

@Component({
  selector: 'app-generate-bills',
  templateUrl: './generate-bills.component.html',
  styleUrls: ['./generate-bills.component.css']
})
export class GenerateBillsComponent {
  constructor(private service:ContactServiceService) { }
  getQuery:any="";

  ngOnInit() {
    this.service.getQueryDetails().subscribe(data=>{
      this.getQuery=data
    })
  }

}
