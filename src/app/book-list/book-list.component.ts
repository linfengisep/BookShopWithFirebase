import { Component, OnInit, OnDestroy } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Book } from '../models/Book.model';

import { MatGridListModule } from '@angular/material/grid-list';
import { Input } from '@angular/core';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit,OnDestroy{
   books:Book[];
   bookSubscription:Subscription;
    //info
    @Input() cols: number;
    @Input() gutterSize: string;
    @Input() rowHeight: string | number;
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

   onViewBook(id:number){
      this.router.navigate(['/books',id]);
   }

   onNewBook(){
      this.router.navigate(['/books','new']);
   }

   onDeleteBook(book:Book){
      this.booksService.deleteBook(book);
   }

   ngOnDestroy(){
      this.bookSubscription.unsubscribe();
   }
}
