import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Book } from 'src/app/models/book';
import { DataService } from 'src/app/services/data.service';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styles: []
  //,  providers: [DataService]  // Provide additional instance of dataSertvice
})
export class EditBookComponent implements OnInit {

  selectedBook: Book;
  bookID: number;
  errorMessage: string = "terroble here";

  constructor(private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private loggerService: LoggerService ) { }

  ngOnInit() {
    this.bookID = parseInt(this.route.snapshot.params['id']);
    console.log(`MESSAGE: Chosen a book with ID: ${this.bookID}`);

    this.dataService.getBookById(this.bookID)
      .subscribe(
        (data: Book) => this.selectedBook = data,
        (err: any) => console.log(" Book Error  with book ID: " + this.bookID + "  " + err),
        () => this.loggerService.log(`All done getting A book with this ID: ${this.bookID}`)
       );
   // this.selectedBook = this.dataService.getBookById(this.bookID);
  }

  setMostPopular(): void {
    this.dataService.setMostPopularBook(this.selectedBook);
    this.loggerService.log(`New most popular book: ${this.selectedBook.title}`)
  }

  //saveChanges(): void {
  //  this.dataService.updateBook(this.selectedBook)
  //    .subscribe(
  //      (data: void) => console.log(`${this.selectedBook.title} updated successfully.`),
  //      (err: any) => console.log(err)
  //    );
  //}

  saveChanges(): void {
    if (true === true) {
      if (this.bookID === 0) {
        this.dataService.addBook(this.selectedBook).subscribe({
          next: () => this.onSaveComplete(`The new ${this.selectedBook.title} was saved`),
          error: err => this.errorMessage = err
        });
      } else {
        console.log(`Save change of a book button is clicked: ${this.selectedBook.title}`)
        this.dataService.updateBook(this.selectedBook)
          .subscribe({
            next: () => this.onSaveComplete(`The updated ${this.selectedBook.title} was saved`),
            error: err => this.errorMessage = err
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }


  onSaveComplete(message?: string): void {
    if (message) {
      this.loggerService.log(message);
    }
    this.reset();
    this.router.navigate(['/dashboard'], { queryParamsHandling: "preserve" });
    // Navigate back to the product list with preserved / preserve parameter.
    this.loggerService.log("Logging a message: " + message);
  }


  reset() {
    this.selectedBook = null;
  }
}
