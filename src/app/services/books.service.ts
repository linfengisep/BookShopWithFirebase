import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../models/Book.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
   books :Book[] = [];
   booksSubject : new Subject<Book>; //un array de books à émettre

   constructor() { }
   emitBooks(){
      this.booksSubject.next(this.books);
   }
   /*save books in firebase
   *set() like put method in http;
   */
   saveBooks(){
      firebase.database().ref('/books').set(this.books);
   }

   getBooks(){
      firebase.database().ref('/books')
         .on('value',
            (data)=>{
            this.books = data.val()? data.val():[]; //if the data.val() is empty
            this.emitBooks();
      });
   }

   getSingleBook(id:number){
      return new Promise(
         (resolve,reject)=>{
            firebase.dabase().ref('books/'+id).once('value').then(
               (data)=>{
                  resolve(data.val());
               },
               (error)=>{
                  reject(error);
               }
         )}
      );
   }

   createNewBook(book:Book){
      this.books.push(book);
      this.saveBooks();
      this.emitBooks();
   }

   deleteBook(book:Book){
      const bookIndexToDel = this.books.findIndex(
         (bookElement)=>{
            if(bookElement === book){
               return true;
            }
         }
      );
     this.books.splice(bookIndexToDel,1);
     this.saveBooks();
     this.emitBooks();
   }
}
