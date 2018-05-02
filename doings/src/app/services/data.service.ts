import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {


  private movementsChange = new Subject<boolean>();
  movementsChanged = this.movementsChange.asObservable();
  constructor() { }

  getMovements() {
    return this.getItem('movements');
  }
  saveMovement(movement) {
    let movements = this.getItem('movements');
    if(!movements) movements = [];
    movements.push(movement);
    this.movementsChange.next(movements);
    return this.setItem('movements', movements);
  }
  getItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
