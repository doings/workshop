import { Pipe, PipeTransform } from '@angular/core';

import {formatDate} from './../shared/utils';

@Pipe({
  name: 'balance'
})
export class BalancePipe implements PipeTransform {

  transform(movements: any, type?: any, filter?: any, interval?: any): any {
    let balance = 0;
    let currentDate = formatDate(new Date());
    switch (type) {
      case "balance":
        movements.filter((m)=>m.date <= currentDate || filter || interval).map((m)=>{
          let amount = parseFloat(m.amount);
          switch (m.type) {
            case "balance":
              balance = amount;
              break;
            case "income":
              balance += amount;
              break;
            case "outcome":
              balance += -amount;
              break;
          }
        })
        break;
      case "income":
        balance = movements.filter((m)=>m.type=='income' && m.date <= currentDate).reduce((s, f) => parseFloat(f.amount) + s, 0);
        break;
      case "outcome":
        balance = movements.filter((m)=>m.type=='outcome' && m.date <= currentDate).reduce((s, f) => parseFloat(f.amount) + s, 0);
        break;
    }
    return balance;
  }

}
