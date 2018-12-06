import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
   errorMessage:string;
   signUpForm:FormGroup;

  constructor(private router:Router,
              private authService:AuthService,
              private formBuilder:FormBuilder) { }

  ngOnInit() {
   this.initForm();
  }

  initForm(){
      this.signUpForm = this.formBuilder.group({
         email:['',[Validators.required,Validators.email]],
         password:['',[Validators.required,Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
      });
  }

  onSubmit(){
   //console.log("form is clicked.");
   const email = this.signUpForm.get('email').value;
   const password = this.signUpForm.get('password').value;
   this.authService.createNewUser(email,password).then(
      ()=>{
         //console.log("success");
         this.router.navigate(['/books']);
      },
      (error)=>{
         //console.log("failure");
         this.errorMessage = error;
      });
     }
}
