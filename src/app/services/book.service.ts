import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
// import { environment } from 'src/environments/environment';
import { environment } from '../../environments/environment';
import { Book } from '../models/book';
import { Categorie } from '../models/categorie';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  
  private subjectName = new Subject<any>(); //need to create a subject

  constructor(private http: HttpClient) { }

  sendUpdate(message: string) { //the component that wants to update something, calls this fn
    this.subjectName.next({ text: message }); //next() will feed the value in Subject
}

  getUpdate(): Observable<any> { //the receiver component calls this function 
      return this.subjectName.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
  }

  /**
     * Get all book's categories as reference data from Backend server.
     */
    loadBooks(): Observable<Book[]>{
      let headers = new HttpHeaders();
      headers.append('content-type', 'application/json');
      headers.append('accept', 'application/json');
      return this.http.get<Book[]>(environment.apiUrl+'/rest/book/api/allbooks', {headers: headers});
  }
    
    /**
     * Get all book's categories as reference data from Backend server.
     */
     loadCategories(): Observable<Categorie[]>{
         let headers = new HttpHeaders();
         headers.append('content-type', 'application/json');
         headers.append('accept', 'application/json');
         return this.http.get<Categorie[]>(environment.apiUrl+'/rest/category/api/allCategories', {headers: headers});
     }
     
    /**
     * Save a new Book object in the Backend server data base.
     * @param book
     */
     saveBook(book: Book): Observable<Book>{
      let headers = new HttpHeaders();
      headers.append('content-type', 'application/json');
      headers.append('accept', 'application/json');
      //return this.http.post(url, JSON.stringify(book),httpOptions);
      //return this.http.post<Book>(environment.apiUrl+'/rest/book/api/addBook', book);
      return this.http.post<Book>(environment.apiUrl+'/rest/book/api/addBook', book, {headers: headers});
     }
     
     /**
      * Update an existing Book object in the Backend server data base.
      * @param book
      */
      updateBook(book: Book): Observable<Book>{
          return this.http.put<Book>(environment.apiUrl+'/rest/book/api/updateBook', book);
      }
      
      /**
       * Delete an existing Book object in the Backend server data base.
       * @param book
       */
       deleteBook(book: Book): Observable<string>{
           return this.http.delete<string>(environment.apiUrl+'/rest/book/api/deleteBook/'+book.id);
       }
     
     /**
      * Search books by isbn
      * @param isbn
      */
     searchBookByIsbn(isbn: string): Observable<Book>{
         return  this.http.get<Book>(environment.apiUrl+'/rest/book/api/searchByIsbn?isbn='+isbn);
     }
     
    /**
     * Search books by title
     * @param title
     */
     searchBookByTitle(title: string): Observable<Book[]>{
             return this.http.get<Book[]>(environment.apiUrl+'/rest/book/api/searchByTitle?title='+title);
     }

     form: FormGroup = new FormGroup({
      $key: new FormControl(null),
      titre: new FormControl('', Validators.required),
      auteur: new FormControl('', Validators.required),
      isbNum: new FormControl('', Validators.required),
      totExemplaire: new FormControl('', Validators.required),
      publiDate: new FormControl('', Validators.required),
      categ: new FormControl('', Validators.required)
      
    });

    insertbook(book) {
      
    }

    initializeFormGroup() {
      this.form.setValue({
        $key: null,
        titre: '',
        auteur: '',
        isbNum: '',
        totExemplaire: '',
        publiDate: '',
        categ:0
      });
    }


    updatebook(book) {
      // this.bookList.update(book.$key,
      //   {
      //     fullName: book.fullName,
      //     email: book.email,
      //     mobile: book.mobile,
      //     city: book.city,
      //     gender: book.gender,
      //     department: book.department,
      //      hireDate: book.hireDate == "" ? "" : this.datePipe.transform(book.hireDate, 'yyyy-MM-dd'),
      //     isPermanent: book.isPermanent
      //   });
    }
  
    deletebook($key: string) {
      //this.bookList.remove($key);
    }
  
    populateForm(book) {
      this.form.setValue({
        $key: null,
        titre: book['title'],
        auteur: book['author'],
        isbNum: book['isbn'],
        totExemplaire: book['totalExamplaries'],
        publiDate: book['releaseDate'],
        categ:0
      });
      //this.form.setValue(_.omit(book,'departmentName'));
    }

}
