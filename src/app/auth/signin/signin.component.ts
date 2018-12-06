import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  errorMessage:string;
  signInForm:FormGroup;

  constructor(private router:Router,
              private authService:AuthService,
              private formBuilder:FormBuilder
              ) { }

  ngOnInit() {
   this.initSignInForm();
  }

  initSignInForm(){
     this.signInForm = this.formBuilder.group({
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
     });
  }

   onSubmit(){
      const email = this.signInForm.get('email').value;
      const password = this.signInForm.get('password').value;
         this.authService.signInUser(email,password).then(
            ()=>{
               this.router.navigate(['/books']);
            },(error)=>{
               this.errorMessage = error;
            });
   }
}
