import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import {ApiService} from './../../services/api.service';

@Component({
  selector: 'doings-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm : FormGroup;
  registerForm : FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public apiService: ApiService,
    public translate: TranslateService) {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
    this.registerForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  ngOnInit() {
  }
  login(){
    if(this.loginForm.valid){
        this.apiService.signIn({username: this.loginForm.value.username, password: this.loginForm.value.password})
          .subscribe(
            res => console.log(res),
            err => console.log(err)
          )
    }
  }
  register(){
    if(this.registerForm.valid){
      let lang = this.translate.store.currentLang;
      this.apiService.signUp({
        username: this.registerForm.value.username, 
        password: this.registerForm.value.password, 
        lang: lang})
        .subscribe(
          res => console.log(res),
          err => console.log(err)
        )
    }
  }

}
