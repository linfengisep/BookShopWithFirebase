import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
   isAuth:boolean;

   constructor(private authService:AuthService) { }

   ngOnInit() {
      firebase.auth().onAuthStateChanged(
         (user) => {
         if(user){
            //console.log("yesssss");
            this.isAuth = true;
         } else {
            //console.log("nooooo");
            this.isAuth = false;
         }
      });
   }

   onSignOut(){
      //console.log("sign out is calling");
      this.authService.signOutUser();
   }

}
