import { Component, OnInit, Input } from '@angular/core';

import {DataService} from './../../services/data.service';

@Component({
  selector: 'doings-movement-filter',
  templateUrl: './movement-filter.component.html',
  styleUrls: ['./movement-filter.component.scss']
})
export class MovementFilterComponent implements OnInit {
  
  @Input('filter') filter: any = '';
  constructor(public dataService: DataService) { }

  ngOnInit() {
  }

  changeFilter(filter) {
    this.dataService.changeFilter(filter);
  }

}
