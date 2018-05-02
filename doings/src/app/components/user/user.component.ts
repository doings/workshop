import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'doings-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  today;
  @Input('movements') movements: any;
  constructor() {
    this.today = new Date();
  }

  ngOnInit() {
  }

}
