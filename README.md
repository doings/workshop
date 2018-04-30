# Welcome to doings workshop
---

## 1. Create project
**Install angular cli**
- npm install -g @angular/cli

**Create project**
- ng new doings
- cd doings
- ng serve --open

###### Note: for the workshop this is already done, just install dependencies with:
- cd doings
- npm install

## 2. Basic layout
**Create components**
- ng g component components/user
- ng g component components/movement

**Create service**
- ng g service services/data

## 3. Angular Material
**Install Angular Material and Angular CDK**
- npm install @angular/material @angular/cdk web-animations-js hammerjs --save

**Add some polyfills in polyfills.ts**
- import 'web-animations-js';
- import 'hammerjs';

**Import you material components modules**
- import { MatButtonModule, MatDatepickerModule, MatInputModule, MatTableModule} from '@angular/material';
- import { CdkTableModule } from '@angular/cdk/table';

**Add your material theme**

