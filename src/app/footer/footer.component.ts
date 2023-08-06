import { Component, OnInit } from '@angular/core';
import { footerImages } from 'src/environments/environment.development';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  footerImg=footerImages
  constructor() { }

  ngOnInit() {
  }

}
