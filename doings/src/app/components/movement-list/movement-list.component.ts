import { Component, OnInit, Input } from '@angular/core';

import {sortList} from './../../shared/utils';

@Component({
  selector: 'doings-movement-list',
  templateUrl: './movement-list.component.html',
  styleUrls: ['./movement-list.component.scss']
})
export class MovementListComponent implements OnInit {

  sortedMovs: any;
  @Input('movements') movements: any;
  constructor() {
  }

  ngOnInit() {
    this.sortedMovs = sortList(this.movements);
  }

}
