import { Component } from '@angular/core';

import {DataService} from './services/data.service';

import {sortHistorical, filterMovs, filterByInterval} from './shared/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  filter: any;
  interval: any = null;
  movements: any;
  allMovements: any;
  constructor(public dataService: DataService) {
    let movements = dataService.getMovements();
    this.allMovements = movements;
    this.movements = this.filterMovements(movements);
    this.dataService.movementsChanged.subscribe( 
      movements => {
        this.allMovements = movements;
        this.movements = this.filterMovements(movements);
      }
    );
    this.dataService.intervalChanged.subscribe( 
      interval => {
        this.interval = interval;
        this.movements = this.filterMovements(this.allMovements);
      }
    );
    this.dataService.filterChanged.subscribe( 
      filter => {
        this.filter = filter;
        this.movements = this.filterMovements(this.allMovements);
      }
    );
  }
  filterMovements(movements) {
    movements = sortHistorical(movements);
    movements = filterMovs(movements, this.filter);
    movements = filterByInterval(movements, this.interval);
    return movements;
  }
  changeFilter(filter) {
    this.filter = filter;
    this.movements = this.filterMovements(this.allMovements);
  }
  changeInterval(interval) {
    this.interval = interval;
    this.movements = this.filterMovements(this.allMovements);
  }
}
