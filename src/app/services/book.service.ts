import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book';
import { Categorie } from '../models/categorie';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  employeeList: [];
  constructor(private http: HttpClient) { }

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
         return this.http.post<Book>(environment.apiUrl+'/rest/book/api/addBook', book);
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
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
      city: new FormControl(''),
      gender: new FormControl('1'),
      department: new FormControl(0),
      hireDate: new FormControl(''),
      isPermanent: new FormControl(false)
    });

    insertEmployee(employee) {
      // this.employeeList.push({
      //   fullName: employee.fullName,
      //   email: employee.email,
      //   mobile: employee.mobile,
      //   city: employee.city,
      //   gender: employee.gender,
      //   department: employee.department,
      //    hireDate: employee.hireDate == "" ? "" : this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
      //   isPermanent: employee.isPermanent
      // });
    }

    initializeFormGroup() {
      this.form.setValue({
        $key: null,
        fullName: '',
        email: '',
        mobile: '',
        city: '',
        gender: '1',
        department: 0,
        hireDate: '',
        isPermanent: false
      });
    }
}
