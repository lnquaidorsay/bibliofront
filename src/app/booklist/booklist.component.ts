import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {

  public pbookList;

  booksResult: Book[] ;

  dataSource;

  searchKey: string;

  displayedColumns: string[] = ['titre', 'auteur','isbn', 'date enregistrement', 'date publication', 'actions'];
  // dataSource = new MatTableDataSource<Book>(this.booksResult);
  listData: MatTableDataSource<Book>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.chargerLivres();
    this.dataSource = new MatTableDataSource<Book>(this.booksResult);
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

}
