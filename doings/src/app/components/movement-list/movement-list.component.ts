import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'doings-movement-list',
  templateUrl: './movement-list.component.html',
  styleUrls: ['./movement-list.component.scss']
})
export class MovementListComponent implements OnInit {

  @Input('movements') movements: any;
  constructor() { }

  ngOnInit() {
  }

}
