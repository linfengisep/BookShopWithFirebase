import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Book } from '../../models/Book.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {
   bookForm : FormGroup;
   fileIsUploading = false;
   fileUrl : string;
   fileUploaded = false;
   constructor(private formBuilder:FormBuilder,
               private booksService:BooksService,
               private router:Router
               ) { }

   ngOnInit() {
      this.initBookForm();
   }

   initBookForm(){
      this.bookForm = this.formBuilder.group({
         title:['',Validators.required],
         author:['',Validators.required]
      });
   }

   onSaveBook(){
      const title = this.bookForm.get('title').value;
      const author = this.bookForm.get('author').value;
      const newBook = new Book(title,author);
      if(this.fileUrl && this.fileUrl !=='' ){
            newBook.photo = this.fileUrl;
      }
      this.booksService.createNewBook(newBook);
      this.router.navigate(['/books']);
   }

   onUploadFile(file:File){
      this.fileIsUploading=true;
      this.booksService.uploadFile(file).then(
         (url:string)=>{
            this.fileUrl = url;
            this.fileUploaded=true;
            this.fileIsUploading=false;
         }
      );
   }

   detectFile(event){
      this.onUploadFile(event.target.files[0]);
   }
}
