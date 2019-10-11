import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'RxJs';

import { Reader } from "src/app/models/reader";
import { DataService } from 'src/app/services/data.service';
import { BadgeService } from 'src/app/services/badge.service';

import { LoggerService } from 'src/app/services/logger.service';



@Component({
  selector: 'app-edit-reader',
  templateUrl: './edit-reader.component.html',
  styles: [],
  providers: [BadgeService]
})
export class EditReaderComponent implements OnInit {

  selectedReader: Reader;
  currentBadge: string;
  readerID: number;
  errorMessage: string;

  get reader(): Reader {
    return this.selectedReader;
  }

  constructor(private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private loggerService: LoggerService,
    private badgeService: BadgeService) { }

  ngOnInit() {
    this.readerID = parseInt(this.route.snapshot.params['id']);
    console.log(`MESSAGE: the reader ID is ${this.readerID}.`);
    //this.selectedReader = this.dataService.getReaderById(readerID);
    this.dataService.getReaderById(this.readerID)
      .subscribe(
        data => this.selectedReader = data,
        err => console.log(`MESSAGE: Error with reading a reader with id   ${this.readerID}.`),
        () => console.log('all done with getting read with an id!')
      );
    this.currentBadge = this.badgeService.getReaderBadge(this.selectedReader.totalMinutesRead);
    console.log(`MESSAGE: the badge is  ${this.currentBadge}. and the name of the reader is ${this.selectedReader.name}`);
  }

  saveChanges(): void {
    if (true === true) {
      if (this.readerID === 0) {
        this.dataService.addReader(this.selectedReader).subscribe({
          next: () => this.onSaveComplete(`The new ${this.selectedReader.name} was saved`),
          error: err => this.errorMessage = err
        });
      } else {
        this.dataService.updateReader(this.selectedReader).subscribe({
          next: () => this.onSaveComplete(`The updated ${this.selectedReader.name} was saved`),
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
    this.selectedReader = null;
    this.currentBadge = null;
    this.readerID = null;
    this.errorMessage = null;
  }
}
