import { Component } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(){
     var config = {
     apiKey: "AIzaSyA9BZebZzUFt7qtjHVA94WVhxYk7Xhd6dE",
     authDomain: "bookshop-287f7.firebaseapp.com",
     databaseURL: "https://bookshop-287f7.firebaseio.com",
     projectId: "bookshop-287f7",
     storageBucket: "bookshop-287f7.appspot.com",
     messagingSenderId: "89966571701"
   };
   firebase.initializeApp(config);
   }
}
