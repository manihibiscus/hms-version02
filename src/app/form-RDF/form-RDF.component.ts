import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { confirmedValidator } from '../confrim.validator';

@Component({
  selector: 'app-form-RDF',
  templateUrl: './form-RDF.component.html',
  styles:[`input.ng-invalid{border :5px solid red;}

  input.ng-valid{border-left:5px solid green;}`
]})
export class FormRDFComponent implements OnInit {

    loginForm = new FormGroup({
    username: new FormControl('vimal', [Validators.required]),
    password: new FormControl(),
    cpassword: new FormControl(),
  });

  constructor(private fb: FormBuilder) {}

  loginForm1 = this.fb.group(
    {
      username: [
        'enter the username',
        [Validators.required, Validators.minLength(3)],
      ],
      password: [, [Validators.required]],
      cpassword: [, [Validators.required]],
    },
    { validator: confirmedValidator('password', 'cpassword') }
  );
    ngOnInit() {
  }

}
