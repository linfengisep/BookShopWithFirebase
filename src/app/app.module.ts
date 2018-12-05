import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListComponent } from './book-list/book-list.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { HeaderComponent } from './header/header.component';

import { AuthService } from './services/auth.service';
import { AuthGuardsService } from './services/auth-guards.service';
import { BooksService } from './services/books.service';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router,RouterModule } from '@angular/router';

const appRoutes = [
   {path:'auth/signin',component:SigninComponent },
   {path:'auth/signup',component:SignupComponent },
   {path:'books',component:BookListComponent },
   {path:'books/new',component:BookFormComponent },
   {path:'books/view/id',component:SingleBookComponent },
]


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    BookListComponent,
    SingleBookComponent,
    BookFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthGuardsService,AuthService,BooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
