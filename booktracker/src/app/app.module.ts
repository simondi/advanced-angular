import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AddReaderComponent } from './add-reader/add-reader.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditReaderComponent } from './edit-reader/edit-reader.component';
import { BooksModule } from './books/books.module';
import { BookLibraryModule } from 'book-library';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EditReaderComponent,
    AddReaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BooksModule,
    BookLibraryModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
