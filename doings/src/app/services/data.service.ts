import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  constructor() { }

  saveMovement(movement) {
    let movements = this.getItem('movements');
    if(!movements) movements = [];
    movements.push(movement);
    return this.setItem('movements', movements);
  }
  getItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
