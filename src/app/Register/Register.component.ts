import { Component, OnInit } from '@angular/core';
import { InterDeactivate } from '../deactivate.guard';
import { UserService } from '../User.service';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements InterDeactivate {
  // userName:any=""
  // mail:any=""
  // mobile:any=""
  constructor() { }

  canExit() :boolean{

    console.log("Can Exit Register")
    if(confirm("you are about to leave registration page .press 'yes' to continue")){
      return true;
    }
    else{
    return false;
  }
  }
  ngOnInit() {
  }

}
