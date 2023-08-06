import { Component, OnInit } from '@angular/core';
import { DetailsService } from '../details.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  getData:any;
  constructor(private service:DetailsService) {
    this.service.getDetails().subscribe(data=>{
      this.getData=data;
    });
  }

  ngOnInit() {
  }

}
