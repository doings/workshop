import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import {DataService} from './../../services/data.service';

@Component({
  selector: 'doings-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  today;
  langs = ['es','en']
  currentLang;
  @Input('filter') filter: any;
  @Input('interval') interval: any;
  @Input('movements') movements: any;
  constructor(public dataService: DataService,
    public translate: TranslateService) {
    this.today = new Date();
  }

  ngOnInit() {
    this.currentLang = this.translate.store.currentLang;
  }

  changeInterval() {
    this.dataService.changeInterval(null)
  }

  changeLang(lang) {
    this.translate.use(lang);
    this.currentLang = lang;
  }

}
