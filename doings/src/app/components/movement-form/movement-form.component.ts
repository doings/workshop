import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {DataService} from './../../services/data.service';
import {formatDate} from './../../shared/utils';

@Component({
  selector: 'doings-movement-form',
  templateUrl: './movement-form.component.html',
  styleUrls: ['./movement-form.component.scss']
})
export class MovementFormComponent implements OnInit {

  form : FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: DataService,
    public dialogRef: MatDialogRef<MovementFormComponent>,
    private formBuilder: FormBuilder) {
    let movement = this.data;
    this.form = this.formBuilder.group({
      movement_uuid: [movement ? movement.movement_uuid:null],
      amount: [movement ? movement.amount:null, Validators.required],
      concept: [movement ? movement.concept:null, Validators.required],
      date: [movement ? movement.date:null, Validators.required],
      type: [movement ? movement.type:null, Validators.required]
    });
  }

  ngOnInit() {
  }

  save() {
    if(this.form.valid){
      let movement = this.form.value;
      if(!movement.movement_uuid) movement.movement_uuid = '_' + Math.random().toString(36).substr(2, 15);
      movement.date = formatDate(movement.date);
      this.dataService.saveMovement(movement);
      this.dialogRef.close();
    }
  }

  delete(movement_uuid) {
    this.dataService.deleteMovement(movement_uuid);
    this.dialogRef.close();
  }
}