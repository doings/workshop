import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {formatDate} from './../../shared/utils';

@Component({
  selector: 'doings-movement-form',
  templateUrl: './movement-form.component.html',
  styleUrls: ['./movement-form.component.scss']
})
export class MovementFormComponent implements OnInit {

  form : FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MovementFormComponent>,
    private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      movement_uuid: [null],
      amount: [null, Validators.required],
      concept: [null, Validators.required],
      date: [null, Validators.required],
      type: [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  save() {
    if(this.form.valid){
      let movement = this.form.value;
      if(!movement.movement_uuid) movement.movement_uuid = '_' + Math.random().toString(36).substr(2, 15);
      movement.date = formatDate(movement.date);
      console.log('Save movement', movement);
      this.dialogRef.close();
    }
  }
}