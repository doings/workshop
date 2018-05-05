import { Component, OnInit, Input } from '@angular/core';

import {DataService} from './../../services/data.service';

@Component({
  selector: 'doings-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  today;
  @Input('filter') filter: any;
  @Input('interval') interval: any;
  @Input('movements') movements: any;
  constructor(public dataService: DataService) {
    this.today = new Date();
  }

  ngOnInit() {
  }

  changeInterval() {
    this.dataService.changeInterval(null)
  }

}
