# Welcome to doings workshop
---

## Create project
**Install angular cli**
- npm install -g @angular/cli

**Create project**
- ng new doings
- cd doings
- ng serve --open

###### Note: for the workshop this is already done, just install dependencies with:
- cd doings
- npm install

## 1. Basic layout
**Create components**
- ng g component components/user
- ng g component components/movement

**Create service**
- ng g service services/data

## 2. Angular Material
**Install Angular Material and Angular CDK**
- npm install @angular/material @angular/cdk web-animations-js hammerjs --save

**Add some polyfills in polyfills.ts**
- import 'web-animations-js';
- import 'hammerjs';

**Import you material components modules**
- import { MatButtonModule, MatDatepickerModule, MatInputModule, MatTableModule} from '@angular/material';
- import { CdkTableModule } from '@angular/cdk/table';

**Add your material theme**

## 3. Launch Modal

**Call function on click**
- (click)="launchModal()"

**Launch modal in function**
- import {MatDialog} from '@angular/material';
- public dialog: MatDialog
- let dialogRef = this.dialog.open(MovementFormComponent);

**Close modal**
- import {MatDialogRef} from '@angular/material';
- public dialogRef: MatDialogRef<MovementFormComponent>
- this.dialogRef.close();

## 4. Movement form

**Angular forms**
- Template-driven forms
- Reactive forms

**Form validation**
- Validators
- Custom validators

## 5. Save movement

**Storage**
- Localstorage
- IndexedDB

## 6. Show movements

**Show movements**
- Get movements
- Pass movements to list
- Render movements list

## 7. Show balance

**Pipes**
- BalancePipe

## 8. Movement EventEmitter

**Observables**
**EventEmitters**
**RxJS library**
**ngOnInit, ngOnChanges**

## 9. Edit movement

**Pass data to modal**

