import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import {ApiService} from './services/api.service';
import {DataService} from './services/data.service';

import {sortHistorical, filterMovs, filterByInterval} from './shared/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user: any;
  filter: any = null;
  interval: any = null;
  movements: any = [];
  allMovements: any = [];
  constructor(
    public apiService: ApiService,
    public dataService: DataService,
    private translate: TranslateService) {
    this.initTranslate();
    this.initUser();
    this.apiService.authenticated.subscribe( 
      user => {
        this.user = user
        if(this.user) this.getMovements();
      } 
    );
    this.dataService.movementsChanged.subscribe( 
      movements => {
        this.getMovements();
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
  initUser(){
    this.getMovements();
    this.user = this.apiService.getCurrentUser();
  }
  getMovements(){
    this.apiService.getMovements().subscribe((movements:any) => {
        if(movements.success){
          movements = movements.movements;
          this.allMovements = movements;
          this.movements = this.filterMovements(movements);
        }
      }, (err:any) => {
      });
  }
  initTranslate() {
    let browserLang = this.translate.getBrowserLang();
    if (browserLang == 'es') {
      this.translate.setDefaultLang('es');
      this.translate.use('es');
    } else {
      this.translate.setDefaultLang('en');
      this.translate.use('en');
    }
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
