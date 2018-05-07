import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {

  private filterChange = new Subject<boolean>();
  filterChanged = this.filterChange.asObservable();
  private intervalChange = new Subject<boolean>();
  intervalChanged = this.intervalChange.asObservable();
  private movementsChange = new Subject<boolean>();
  movementsChanged = this.movementsChange.asObservable();
  constructor() { }
  changeMovements() {
    this.movementsChange.next();
  }
  changeInterval(interval) {
    this.intervalChange.next(interval);
  }
  changeFilter(filter) {
    this.filterChange.next(filter);
  }
  getItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
