import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
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
  MatListModule,
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
import { MovementFormComponent } from './components/movement-form/movement-form.component';
import { MovementListComponent } from './components/movement-list/movement-list.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    MovementComponent,
    MovementFormComponent,
    MovementListComponent
  ],
  entryComponents: [
    MovementFormComponent
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
    MatListModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatToolbarModule
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
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
    MatListModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
