import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListComponent } from './book-list/book-list.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { AuthGuardsService } from './services/auth-guards.service';

const appRoutes: Routes = [
   {path:'auth/signin',component:SigninComponent },
   {path:'auth/signup',component:SignupComponent },
   {path:'books',canActivate:[AuthGuardsService],component:BookListComponent },
   {path:'books/new',canActivate:[AuthGuardsService],component:BookFormComponent },
   {path:'books/:id',component:SingleBookComponent },
   {path:'', redirectTo:'/books',pathMatch:'full' },
   {path:'**', redirectTo:'/books'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
