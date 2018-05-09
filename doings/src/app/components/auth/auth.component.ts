import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { MatSnackBar } from '@angular/material';

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
    public snackBar: MatSnackBar,
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
            res => {
              if(res.success){
                this.apiService.saveToken(res.token);
              }else{
                let snackBarRef = this.snackBar.open(res.msg, '', {duration: 2400});
              }
            }
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
            res => {
              if(res.success){
                this.apiService.saveToken(res.token);
              }else{
                let snackBarRef = this.snackBar.open(res.msg, '', {duration: 2400});
              }
            }
          )
    }
  }

}
