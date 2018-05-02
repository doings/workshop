import { Component, OnInit, Input } from '@angular/core';

import { stockChart } from 'highcharts/highstock';
import * as Highcharts from 'highcharts/highstock';

@Component({
  selector: 'doings-movement-chart',
  templateUrl: './movement-chart.component.html',
  styleUrls: ['./movement-chart.component.scss']
})
export class MovementChartComponent implements OnInit {

  @Input('movements') movements: any;
  constructor() { }

  ngOnInit() {
  }

}
