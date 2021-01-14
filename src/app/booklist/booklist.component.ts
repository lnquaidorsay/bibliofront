import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';
import { BookComponent } from '../book/book.component';
import { Observable, Subject, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
//import { BookComponent } from '../book/book.component';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnDestroy {

  public pbookList;

  booksResult: Book[] ;

  dataSource;

  searchKey: string;

  private subscriptionName: Subscription; //important to create a subscription

  messageReceived: any;
    

 // private dialog: MatDialog;

  displayedColumns: string[] = ['titre', 'auteur','isbn', 'date enregistrement', 'date publication', 'actions'];
  // dataSource = new MatTableDataSource<Book>(this.booksResult);
  listData: MatTableDataSource<Book>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private bookService: BookService, public dialog: MatDialog) {
    // subscribe to sender component messages
    this.subscriptionName= this.bookService.getUpdate().subscribe
    (message => { //message contains the data sent from service
    this.messageReceived = message; //kind of a flag here
    this.chargerLivres(); //or ngOnInit() whichever responsible for laoding
    });
   }

  ngOnInit(): void {
    this.chargerLivres();
    this.dataSource = new MatTableDataSource<Book>(this.booksResult);
  }

  ngOnDestroy() { // It's a good practice to unsubscribe to ensure no memory leaks
            this.subscriptionName.unsubscribe();
        }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  chargerLivres(){
    console.log("list des books avant affcihage");
      this.bookService.loadBooks().subscribe(
              (result: Book[]) => {
                console.log("list des books : ",result);
                this.booksResult = result;
                this.listData = new MatTableDataSource(result);
                this.pbookList=result;
                console.log("bookResult : ",this.booksResult);
              },
              error => {
                console.log("Erreur : ",error);
              }
      );
  }

  onCreate() {
    this.bookService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    //dialogConfig.width = "350px";
    this.dialog.open(BookComponent,dialogConfig);
  }

  onEdit(row){
    console.log("row : ",row);
    console.log("titre : ",row['title']);
    let cat = row['category'];
    let code = cat.code;
    let label = cat.label;
    console.log("category : ",row['category']);
    console.log("code : ",code);
    console.log("label : ",label);
    console.log("label2 : ",row['category'].label);
    this.bookService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(BookComponent,dialogConfig);
  }

  onDelete($key){
    console.log('delete book  : ',$key);
    // if(confirm('Are you sure to delete this record ?')){
    // this.bookService.deleteBook($key);
    // //this.notificationService.warn('! Deleted successfully');
    // }
  }

  openDialog(row) {
    Swal.fire({
      title: 'Voulez-vous supprimer ce livre?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.value) {
        console.log("row pour deleted: ",row);
         this.bookService.deleteBook(row).subscribe(data => {
          this.bookService.sendUpdate('A msg/flag');
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

}

