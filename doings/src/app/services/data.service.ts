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
  getMovements() {
    return this.getItem('movements');
  }
  saveMovement(movement) {
    let movements = this.getItem('movements');
    if(!movements) movements = [];
    if(movement.movement_uuid && movements.filter((m)=>m.movement_uuid==movement.movement_uuid).length){
      movements = movements.map((m)=>m.movement_uuid==movement.movement_uuid?movement:m);
    }else{
      movements.push(movement);
    }
    this.movementsChange.next(movements);
    return this.setItem('movements', movements);
  }
  deleteMovement(movement_uuid) {
    let movements = this.getItem('movements');
    if(movement_uuid) movements = movements.filter((m)=>m.movement_uuid!=movement_uuid);
    this.movementsChange.next(movements);
    return this.setItem('movements', movements);
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
