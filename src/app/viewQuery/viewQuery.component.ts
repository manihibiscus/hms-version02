import { Component, OnInit } from '@angular/core';
import { ContactServiceService } from '../contactService.service';

@Component({
  selector: 'app-viewQuery',
  templateUrl: './viewQuery.component.html',
  styleUrls: ['./viewQuery.component.css']
})
export class ViewQueryComponent implements OnInit {

  constructor(private service:ContactServiceService) { }
  getQuery:any="";

  ngOnInit() {
    this.service.getQueryDetails().subscribe(data=>{
      this.getQuery=data
    })
  }

}
