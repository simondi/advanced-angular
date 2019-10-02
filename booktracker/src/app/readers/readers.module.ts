import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { ReadersRoutingModule } from './readers-routing.module';
import { AddReaderComponent } from './add-reader/add-reader.component';
import { EditReaderComponent } from './edit-reader/edit-reader.component';
import { reducer } from './state/reader.reducer';

@NgModule({
  declarations: [
    AddReaderComponent,
    EditReaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReadersRoutingModule,
    StoreModule.forFeature('readers', reducer)
  ]
})
export class ReadersModule { }
