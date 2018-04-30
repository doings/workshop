import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


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
  imports: [
    BrowserModule,
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
