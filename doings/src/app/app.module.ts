import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CdkTableModule } from '@angular/cdk/table';
import { 
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatToolbarModule
   } from '@angular/material';


import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { MovementComponent } from './components/movement/movement.component';

import { DataService } from './services/data.service';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    MovementComponent
  ],
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatToolbarModule
  ],
  imports: [
    BrowserModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatToolbarModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
