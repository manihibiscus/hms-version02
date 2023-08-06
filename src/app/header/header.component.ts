import { Component, OnInit } from '@angular/core';
import { homeHeaderImages } from 'src/environments/environment.development';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  headerImg=homeHeaderImages
  constructor() { }

  ngOnInit() {
  }

}
