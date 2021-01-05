import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(public service: BookService,public dialogRef: MatDialogRef<BookComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('$key').value)
        this.service.insertEmployee(this.service.form.value);
      else
      //this.service.updateEmployee(this.service.form.value);
      this.service.form.reset();
      //this.service.initializeFormGroup();
      //this.notificationService.success(':: Submitted successfully');
      this.onClose();
    }
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
