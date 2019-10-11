import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, throwError } from 'rxjs';

import { LoggerService } from "src/app/services/logger.service";
import { Book } from "src/app/models/book";
import { Reader } from "src/app/models/reader";
import { DataService } from 'src/app/services/data.service';
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
        private title: Title,
        private loggerService: LoggerService
  ) {
    loggerService.log('Creating the dashboard!');
  }
  
  ngOnInit() {

    this.dataService.getAllBooks()
      .subscribe(
        data => this.allBooks = data,
        err => console.log(err.friendlyMessage),
        () => this.loggerService.log('All done getting books!')
    );

    //this.allReaders = this.dataService.getAllReaders();
    this.dataService.getAllReaders()
      .subscribe(
        (data: Reader[]) => this.allReaders = data,
        (error: BookTrackerError) => console.log(error.friendlyMessage),
        () => this.loggerService.log('All done getting readers!')
    );

    this.mostPopularBook = this.allBooks[0];

    this.title.setTitle(`Book Tracker`);
  }

  deleteBook(bookID: number): void {
    this.dataService.deleteBook(bookID)
      .subscribe(
        (data: Book) => {
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
