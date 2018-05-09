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

## 10. Delete movement

## 11. Filter movements

## 12. Highcharts

**Easy to use**
**Responsive**
**Touch**
**Styling**
**Community**

## 13. Movements chart

**Chart types**
**PlotOptions**
**Axis**
**Series**

## 14. Chart events

## 15. Translate

## 16. Start express

**Start express with nodemon**
- npm init
- npm i -g nodemon
- npm i express --save
- touch index.js
- nodemon index.js

```javascript
const express = require('express')
const app = express()

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
```

###### Note: for the workshop the app is already created, just install dependencies with:
- npm i -g nodemon
- npm i
- nodemon index.js

## 17. Create service

```javascript
app.get('/', function (req, res) {
  res.send('Hello World!')
})
```

## 18. Connect to mongo

- mongo
- show databases
- use doings_workshop
- show collections
- db.createCollection('movements')

## 19. Send movement

**Http Module**
- http.post
```javascript
  public saveMovement(movement) {
    let url = this.host + '/movement';
    return this.http.post(url, movement);
  }
```
- subscribe
```javascript
  this.apiService.saveMovement(movement)
    .subscribe(
      res => showSuccess(res),
      err => showError(err),
    );
```

**CORS**

## 20. Movement model

**Create schema**
```javascript
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var movementSchema = new Schema({
  movement_uuid: {
    type: String,
    unique: true,
    required: true
  },
  ....
});
module.exports = mongoose.model('Movement', movementSchema);
```

## 21. Save movement

```javascript

var MovementModel = require('./../models/movement.model');

var newMovement = new MovementModel(req.body);
newMovement.movement_uuid = uuid;
newMovement.save(function(err) {
  if (err) {
    return res.json({
      success: false,
      msg: 'Uuid already exists. Try again.'
    });
  }
  res.json({
    success: true,
    movement: newMovement
  });
});
```

## 22. Get, update and delete movements

**Get**
```javascript
  MovementModel.find({}, {
      _id: 0,
      __v: 0
    },
    function(err, movements) {
      if (err) throw err;
      if (!movements) {
        res.json({
          success: false,
          msg: 'Movements not found.'
        });
      } else {
        res.json({
          success: true,
          movements: movements
        });
      }
    });
```

**Update**
```javascript
  MovementModel
    .findOne({
      movement_uuid: req.body.movement_uuid
    }, {},
    function(err, movement) {
        movement.concept = req.body.concept,
        movement.amount = req.body.amount
        movement.save(function(err, data) {
          res.json({
            success: true,
            movement: movement
          });
        });
      }
    });
```

**Delete**
```javascript
  MovementModel.findOneAndRemove({
    movement_uuid: req.params.movement_uuid
  }, {},
  function(err, deleted) {
    res.json({
      success: true,
      deleted: deleted
    });
  })
```

## 23. Authentication forms

**Check user**
**Login form, login request**
**Register form, register request**


## 24. Authentication services

**Install Jwt**
- cd doings
- npm i angular2-jwt --save
- cd doings-api
- npm i jwt-simple passport-jwt --save

**Signin service**

**Signup service**

**Save token**

**Logout**

## 25. Authenticated requests

**next()**









