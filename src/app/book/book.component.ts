import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  public book = new Book();

  constructor(public service: BookService, private spinner: NgxSpinnerService,public dialogRef: MatDialogRef<BookComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit() {
    if (this.service.form.valid) {
      const formValue = this.service.form.value;
      this.book.author = formValue['auteur'];
      this.book.isbn = formValue['isbNum'];
      //this.book.releaseDate = formValue['publiDate'];
      this.book.category.code = formValue['categ'];
      this.book.title = formValue['titre'];
      this.book.totalExamplaries = formValue['totExemplaire'];
      var localDate = new Date(formValue['publiDate']);
      if(localDate.getTimezoneOffset() < 0){
          localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset() );
      }else{
        localDate.setMinutes(localDate.getMinutes() + localDate.getTimezoneOffset() );
      }
      console.log("get value form insert : ",this.service.form.value);
      this.book.releaseDate = localDate;
      if (!this.service.form.get('$key').value){
        // console.log("get value form insert : ",this.service.form.value);
        console.log("book to insert 24 : ",this.book);
        //this.service.insertEmployee(this.service.form.value);
        console.log("formValue['categ'] ",formValue['categ']);
        this.saveNewBook(this.book);
      }
      else {
        this.service.form.reset();
        this.service.initializeFormGroup();
        console.log("Categorie : ",formValue['categ']);
      }
      //this.service.updateEmployee(this.service.form.value);
      //this.service.form.reset();
      //this.service.initializeFormGroup();
      //this.notificationService.success(':: Submitted successfully');
      this.onClose();
    }
  }

  /**
* Save new book
* @param book
*/
saveNewBook(book: Book){
  this.spinner.show();
  this.service.saveBook(book).subscribe(
          (result: Book) => {
              console.log("Resultat du livre : ",result);
             if(result.id){
              this.service.sendUpdate('A msg/flag');
                this.spinner.hide();
                 console.log("Le livre a ajoute avec id : ",result.id);
                // this.buildMessageModal('Save operation correctly done');
             }
          },
          error => {
               this.spinner.hide();
               console.log("erreur survenue lors de  ajout : ",error);
              // this.buildMessageModal('An error occurs when saving the book data');
          }
  );
}


  /**
* Save new book
* @param book
*/
updatBook(book: Book){
  // this.service.saveBook(book).subscribe(
  //         (result: Book) => {
  //             console.log("Resultat du livre : ",result);
  //            if(result.id){
  //             this.service.sendUpdate('A msg/flag');
  //            }
  //         },
  //         error => {
  //              this.spinner.hide();
  //              console.log("erreur survenue lors de  ajout : ",error);
  //         }
  // );
}

openDialog(book:Book) {
  Swal.fire({
    title: 'Voulez-vous supprimer ce livre?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Supprimer!',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.value) {
       this.service.deleteBook(book).subscribe(data => {
        this.service.sendUpdate('A msg/flag');
        Swal.fire(
          'Effectué!',
          'Le livre a été supprimé.',
          'success'
        )
        console.log("data return with remove : ",data);
    },error => {
      console.log("Erreur lors de la suppression du livre: ",error);
    });
  } 
  })
}

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

  

  /**
* Save zone local date to the book releaseDate property : 
*   there is a recognized problem with datepicker @angular/material timezone conversion.
* @param book
*/
setLocalDateToDatePicker(book: Book){
  var localDate = new Date(book.releaseDate);
  if(localDate.getTimezoneOffset() < 0){
      localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset() );
  }else{
    localDate.setMinutes(localDate.getMinutes() + localDate.getTimezoneOffset() );
  }
  book.releaseDate = localDate;
}

}
