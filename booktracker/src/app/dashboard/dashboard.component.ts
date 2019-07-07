import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Book } from "src/app/models/book";
import { Reader } from "src/app/models/reader";
import { DataService } from 'src/app/core/data.service';
import { BookTrackerError } from 'src/app/models/bookTrackerError';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  constructor(private dataService: DataService,
              private title: Title) { }
  
  ngOnInit() {

    this.allBooks = this.dataService.getAllBooks();
    this.allReaders = this.dataService.getAllReaders();
    this.mostPopularBook = this.dataService.mostPopularBook;

    this.title.setTitle(`Book Tracker`);
  }

  deleteBook(bookID: number): void {
    this.dataService.deleteBook(bookID)
      .subscribe(
        (data: void) => {
          let index: number = this.allBooks.findIndex(book => book.bookID === bookID);
          this.allBooks.splice(index, 1);
        },
        (err: any) => console.log(err)
      );
  }

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }

}
