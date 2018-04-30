import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'doings-movement-form',
  templateUrl: './movement-form.component.html',
  styleUrls: ['./movement-form.component.scss']
})
export class MovementFormComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MovementFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  save() {
    this.dialogRef.close();
  }

}
