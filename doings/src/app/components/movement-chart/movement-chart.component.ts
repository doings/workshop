import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

import { stockChart } from 'highcharts/highstock';
import * as Highcharts from 'highcharts/highstock';

import {DataService} from './../../services/data.service';
import {formatDate} from './../../shared/utils';

@Component({
  selector: 'doings-movement-chart',
  templateUrl: './movement-chart.component.html',
  styleUrls: ['./movement-chart.component.scss']
})
export class MovementChartComponent implements OnInit {


  options: Highcharts.Options = {
    title: { text: ''},
    credits: { enabled: false},
    legend: { enabled: false},
    chart: {
      type: 'scatter',
      zoomType: 'x',
      panning: true,
      backgroundColor: 'rgba(255, 255, 255, 0.0)',
      resetZoomButton: { 
          relativeTo: 'plot',
          position: {
            x: 100,
            y: 100
          }
      }
    },
    scrollbar: {
      barBackgroundColor: 'gray',
      barBorderRadius: 7,
      barBorderWidth: 0,
      buttonBackgroundColor: 'gray',
      buttonBorderWidth: 0,
      buttonBorderRadius: 7,
      trackBackgroundColor: 'none',
      trackBorderWidth: 1,
      trackBorderRadius: 8,
      trackBorderColor: '#CCC'
    },
    rangeSelector: {
        enabled: false
    },
    plotOptions: {
      bar: {
        borderWidth: 2
      },
      series: {
        turboThreshold: 100000,
        stacking: 'normal'
      }
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        month: '%e. %b',
        year: '%b'
      },
      title: {
        text: ''
      },
      events: {}
    },
    yAxis: {
      title: {
        text: ''
      },
      gridLineColor : '#474747'
    },
    series: []
  };
  chart: Highcharts.ChartObject;
  showWalletBalance: boolean = true;
  @ViewChild('chartTarget') chartTarget: ElementRef;
  @Input('movements') movements: any;
  @Input('filter') filter: any;
  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.chartMovements(this.movements);
  }

  ngOnChanges(map) {
    if(map.movements) this.chartMovements(map.movements.currentValue);
  }

  chartMovements(movs) {
    let movSeries = [];
    if(movs){
      movs = this.sortMovements(movs);
      let series = {
        outcome: this.getMovementsSerie('Expenses', 'column', 'rgb(193, 56, 56)'),
        income:  this.getMovementsSerie('Incomes', 'column', 'rgb(83, 152, 83)'),
        balance: this.getMovementsSerie('Balance', 'column', 'rgb(255, 255, 255)'),
        wallet:  this.getMovementsSerie('Wallet', 'line', 'rgb(255, 255, 255)')
      }
      let wallet, movement, lastDate, balance = 0;
      for(let mov of movs) {

        let type = mov.type;
        let label = this.getMovementLabel(mov);
        let date: any = new Date(mov.date);
        let amount: any = parseFloat(mov.amount);
        let dateUTC = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());

        switch (type) {
          case "outcome":
          case "income":
          case "balance":
            // Build type serie
            movement = {
              x: dateUTC, 
              y: type=='outcome'?-amount:amount, 
              label: label, 
              date: mov.date
            };
            let last = series[type].data[series[type].data.length-1];
            if(last && new Date(last.date).toDateString() == new Date(mov.date).toDateString()){
              series[type].data[series[type].data.length-1].y += -amount;
              series[type].data[series[type].data.length-1].label += label;
            }else{
              series[type].data.push(movement);
            }
           default:
            // Build wallet serie
            balance += type == 'outcome' ? -amount : amount;
            if(type == 'balance') balance = amount;
            let walletLen = series.wallet.data.length;
            let walletLast = series.wallet.data[walletLen-1];
            if(walletLast && new Date(walletLast.date).toDateString() == new Date(mov.date).toDateString()){
              series.wallet.data[walletLen-1].y = balance;
              series.wallet.data[walletLen-1].label = this.getMovementLabel({concept: 'WALLET', amount: balance, type: 'balance'});
            }else{
              series.wallet.data.push({
                x: dateUTC, 
                y: balance, 
                date: mov.date,
                label: this.getMovementLabel({concept: 'WALLET', amount: balance, type: 'balance'})
              });
            }

        }
        lastDate = new Date(date.getTime());
        lastDate.setDate(lastDate.getDate() + 1);
      }

      if(!this.filter){
        movSeries.push(series.wallet);
      }
      movSeries.push(series.balance);
      movSeries.push(series.income);
      movSeries.push(series.outcome);
    }

    let chartOptions = this.options;
    chartOptions.series = movSeries;
    this.chart = this.chartTarget ? stockChart(this.chartTarget.nativeElement, chartOptions) : null;
    this.chart.options.tooltip.formatter = function() {
      let value = 0;
      let label= formatDate(this.x);
      for(let point of this.points) {
        value = point.y.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        if(point.point.label) label += point.point.label;
        else if(point.series.name) label += ' <br> <b>' + point.series.name + ':</b> ' + value;
      }
      return label;
    }
  }
  sortMovements(movs) {
    movs = Object.assign([], movs);
    movs && movs.length ? movs.sort(function(a,b){
      let date1 = new Date(a.date);
      let date2 = new Date(b.date)
      if (date2 > date1) return -1;
      if (date2 < date1) return 1;
    }) : null;
    return movs;
  }
  getMovementsSerie(name, type, color) {
    return {
      name: name,
      type: type,
      color: color, borderColor: color, borderWidth: 2,
      data: []
    }
  }
  getMovementLabel(movement) {
    let amount = parseFloat(movement.amount);
    amount = movement.type == 'outcome' ? -amount : amount;
    return ' <br> <b>' + movement.concept + ':</b> ' + amount;
  }
}
