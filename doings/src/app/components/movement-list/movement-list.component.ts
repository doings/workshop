import { Component, OnInit, Input } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {MovementFormComponent} from './../movement-form/movement-form.component';

import {sortList} from './../../shared/utils';

@Component({
  selector: 'doings-movement-list',
  templateUrl: './movement-list.component.html',
  styleUrls: ['./movement-list.component.scss']
})
export class MovementListComponent implements OnInit {

  sortedMovs: any;
  @Input('movements') movements: any;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.sortedMovs = sortList(this.movements);
  }

  ngOnChanges(map) {
    this.sortedMovs = sortList(this.movements);
  }

  editMovement(movement) {
    let dialogRef = this.dialog.open(MovementFormComponent, {
      width: '280px',
      data: movement
    });
  }

}
