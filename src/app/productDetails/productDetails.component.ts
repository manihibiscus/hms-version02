import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from '../details.service';

@Component({
  selector: 'app-productDetails',
  templateUrl: './productDetails.component.html',
  styleUrls: ['./productDetails.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private service:DetailsService, private route:ActivatedRoute) { }
  productList:any="";
  SearchFor:any="";
  finalProduct:any="";

  ngOnInit() {
    this.service.getDetails().subscribe(data=>
      {
        this.productList=data;
        this.route.params.subscribe(paramdata=>{
          this.SearchFor=paramdata['check'];

          for(let pro of this.productList){
            if(pro.name==this.SearchFor){
              this.finalProduct =pro;
              break;
            }
          }
        })
      });

    }
    }
    