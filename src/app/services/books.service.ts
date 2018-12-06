import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../models/Book.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class BooksService {
   books : Book[]=[];
   booksSubject = new Subject<Book[]>();
   constructor(){}
   emitBooks(){
      this.booksSubject.next(this.books);
   }

   saveBooks(){
      firebase.database().ref('/books').set(this.books);
   }

   getBooks(){
      firebase.database().ref('/books')
         .on('value',
            (data)=>{
            this.books = data.val() ? data.val():[];
            this.emitBooks();
         });
   }

   getSingleBook(id:number){
      return new Promise(
         (resolve,reject)=>{
            firebase.database().ref('/books/'+id).once('value').then(
               (data)=>{
                  resolve(data.val());
               },
               (error)=>{
                  reject(error);
               }
            );
         }
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

   uploadFile(file:File){
      return new Promise(
         (resolve,reject)=>{
            const uploadingTime = Date.now().toString();
            //const uploadingTime = '2018/02/11111';
            const upload = firebase.storage().ref()
            .child('images/' + uploadingTime + file.name)
            .put(file);
            upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
               () => {
                  console.log('chargement en cours');
               },
               (error)=>{
                  console.log('there is an error:'+error);
                  reject();
               },
               ()=>{
                  resolve(upload.snapshot.downloadURL);
               }
            );
         }
      );
   }
}
