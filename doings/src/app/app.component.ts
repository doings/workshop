import { Component } from '@angular/core';

import {DataService} from './services/data.service';

import {sortHistorical} from './shared/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  movements: any;
  constructor(public dataService: DataService) {
    let movements = dataService.getMovements();
    this.movements = sortHistorical(movements);
    this.dataService.movementsChanged.subscribe( 
      movements => {
        this.movements = sortHistorical(movements);
      }
    );
  }
}
