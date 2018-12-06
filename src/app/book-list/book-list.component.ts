import { Component, OnInit, OnDestroy } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Book } from '../models/Book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit,OnDestroy{
   books:Book[];
   bookSubscription:Subscription;

   constructor(private booksService:BooksService,
               private router:Router) { }

   ngOnInit() {
      this.bookSubscription = this.booksService.booksSubject.subscribe(
         (books:Book[])=>{
            this.books=books;
         }
      )
      this.booksService.getBooks();
      this.booksService.emitBooks();
   }

   onNewBook(){
      //console.log("to new book page");
      this.router.navigate(['/books','new']);
   }

   onDeleteBook(book:Book){
      this.booksService.deleteBook(book);
   }

   onViewBook(id:number){
      this.router.navigate(['/books','view',id]);
   }

   ngOnDestroy(){
      this.bookSubscription.unsubscribe();
   }
}
