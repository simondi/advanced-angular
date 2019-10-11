import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AddBookComponent } from './add-book/add-book.component';
import { AddReaderComponent } from './add-reader/add-reader.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { EditReaderComponent } from './edit-reader/edit-reader.component';
import { LoggerService } from './services/logger.service';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { Data } from './services/data';
 

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddBookComponent,
    EditReaderComponent,
    EditBookComponent,
    AddReaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(Data, { delay: 1000 })
  ],
  providers: [
    //  { provide: LoggerService, useClass: PlainLoggerService },
    //{provide: LoggerService, useValue: {
    //    log: (message) => console.log(`MESSAGE: ${message}`),
    //    error: (message) => console.error(`PROBLEM: ${message}`)
    //  }
    //},
    //{ provide: DataService, useFactory: dataServiceFactory, deps: [LoggerService] }
    LoggerService 
      ],
  bootstrap: [AppComponent]
})
export class AppModule { }
