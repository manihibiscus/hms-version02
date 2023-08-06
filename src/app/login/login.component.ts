import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../Login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName:any="";
  password:any="";
  retUrl:any="home";
  constructor(private service:LoginService,private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(parama=>{
          this.retUrl=parama.get('retUrl');
          console.log("LoginComponent/ngOnInit",this.retUrl);
        })
      }
      onLogin(){
        this.service.login(this.userName,this.password).subscribe((data)=>{
          console.log("return to"+this.retUrl);
          if(this.retUrl!=null){
            this.router.navigate([this.retUrl]);
          }
          else{
            this.router.navigate(['home'])
          }
        })
      }
    }
