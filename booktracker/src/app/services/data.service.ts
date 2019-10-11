import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { LoggerService } from './logger.service';
import { Reader } from './../../app/models/reader';
//import { allReaders, allBooks } from './../../app/data';
import { Book } from './../../app/models/book';

import { BookTrackerError } from 'src/app/models/bookTrackerError';
import { OldBook } from 'src/app/models/oldBook';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  mostPopularBook: Book;
  allBooks : Book[];
  //private http: HttpClient;
  private booksUrl = 'api/Books';
  private readersUrl = 'api/Readers';

  constructor(
    private loggerService: LoggerService,
    private http: HttpClient) { }

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllBooks(): Observable<Book[]> {
    // URL to get all books is /api/books
    return this.http.get<Book[]>(this.booksUrl);
  }

  getAllReaders(): Observable<Reader[] | BookTrackerError> {
    return this.http.get<Reader[]>(this.readersUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getBookById(id: number): Observable<Book | BookTrackerError> {
    if (id === 0) {
      return of(this.initializeBook());
    }
    const url = `${this.booksUrl}/${id}`;
    console.log(`Message: book with ID URL:  ${url}.`)
    return this.http.get<Book>(url)
      .pipe(
        tap(data => console.log('get a Book: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getReaderById(id: number): Observable<Reader> {
    // sample URL to get a reader by ID is /api/readers/1
    const url = `${this.readersUrl}/${id}`;
    console.log(`Message: readers URL:  ${url}.`)
    return this.http.get<Reader>(url);
    //return allReaders.find(reader => reader.readerID === id);
  }

  private handleHttpError(error: HttpErrorResponse): Observable<BookTrackerError> {
    let dataError = new BookTrackerError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occurred retrieving data.';
    return throwError(dataError);
  }


  getOldBookById(id: number): Observable<OldBook> {
    return this.http.get<Book>(`/api/books/${id}`)
      .pipe(
        map(b => <OldBook>{
          bookTitle: b.title,
          year: b.publicationYear
        })
      )
  }

  addBook(book: Book): Observable<Book | BookTrackerError> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    book.bookID = null;
    return this.http.post<Book>(this.booksUrl, book, { headers })
      .pipe(
        tap(data => console.log('createBook: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  addReader(reader: Reader): Observable<Reader | BookTrackerError> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    reader.readerID = null;
    return this.http.post<Reader>(this.readersUrl, reader, { headers })
      .pipe(
        tap(data => console.log('createReader: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }


  updateBook(book: Book): Observable<Book | BookTrackerError> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.booksUrl}/${book.bookID}`;
    return this.http.put<Book>(url, book, { headers })
      .pipe(
        tap(() => console.log('updateBook: ' + book.bookID)),
        // Return the product on an update
        map(() => book),
        catchError(this.handleError)
      );
  }

  updateReader(reader: Reader): Observable<Reader | BookTrackerError> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.readersUrl}/${reader.readerID}`;
    return this.http.put<Book>(url, reader, { headers })
      .pipe(
        tap(() => console.log('updateBook: ' + reader.readerID)),
        // Return the product on an update
        map(() => reader),
        catchError(this.handleError)
      );
  }

  deleteBook(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.booksUrl}/${id}`;
    return this.http.delete<Book>(url, { headers })
      .pipe(
        tap(data => console.log(`delete Book for book id: ${id}`)),
        catchError(this.handleError)
      );
  }

  private initializeBook(): Book {
    // Return an initialized object
    return {
      bookID: 0,
      title: null,
      author: null,
      publicationYear: null  
    };
  }

  private handleError(error: HttpErrorResponse): Observable<BookTrackerError> {
    let dataError = new BookTrackerError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = "An error occured during trtriving data";
    return throwError(dataError);
  }

  /*
  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
*/

}
