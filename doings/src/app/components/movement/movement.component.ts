import { Component, OnInit } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {MovementFormComponent} from './../movement-form/movement-form.component';

@Component({
  selector: 'doings-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.scss']
})
export class MovementComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  createMovement() {
    let dialogRef = this.dialog.open(MovementFormComponent, {
      width: '280px'
    });
  }
}
