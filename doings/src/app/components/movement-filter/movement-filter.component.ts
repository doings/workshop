import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'doings-movement-filter',
  templateUrl: './movement-filter.component.html',
  styleUrls: ['./movement-filter.component.scss']
})
export class MovementFilterComponent implements OnInit {
  
  @Output('filterChanged') filterChanged = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  changeFilter(event) {
    this.filterChanged.next(event);
  }

}
