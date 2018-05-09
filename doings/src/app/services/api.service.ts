import { Injectable } from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';
import {Subject} from "rxjs/Subject";
import {JwtHelper} from 'angular2-jwt';

import {environment} from './../../environments/environment';

@Injectable()
export class ApiService {

  url: string;
  private authenticate = new Subject<boolean>();
  authenticated = this.authenticate.asObservable();
  constructor(public http: Http) {
    this.url = environment.apiHost;
  }

  public getMovements() {
    return this.get('/movement').map((x)=>x.json());
  }

  public saveMovement(movement) {
    if(movement.movement_uuid)
      return this.put('/movement', movement).map((x)=>x.json());
    else
      return this.post('/movement', movement).map((x)=>x.json());
  }

  public deleteMovement(movement_uuid) {
    if(movement_uuid)
      return this.delete('/movement/' + movement_uuid).map((x)=>x.json());
  }

  signIn(params?) {
    return this.post('/user/signin', params).map((x)=>x.json())
  }

  signUp(params?) {
    return this.post('/user/signup', params).map((x)=>x.json())
  }

  // save the token in localStorage and change the navbar state
  saveToken(token: string): void {
    let userData = null;
    if(!token) localStorage.removeItem('token')
    else {
      localStorage.setItem('token', token);
      let jwtHelper: JwtHelper = new JwtHelper();
      userData = jwtHelper.decodeToken(token);
    }
    this.authenticate.next(userData);
  }

  getCurrentUser() {
    let token = localStorage.getItem('token');
    if(token){
      let jwtHelper: JwtHelper = new JwtHelper();
      token = jwtHelper.decodeToken(token);
    }
    return token ? token : null;
  }

  // delete the token in localStorage and change the navbar state
  logOut(): void {
    localStorage.removeItem('token');
    this.authenticate.next(null);
  }

  get(endpoint: string, params?: any) {
    let token;
    let headers = new Headers();
    try{
      if(localStorage.getItem('token')) token = localStorage.getItem('token');
    }catch(e){
    }
    if(token) headers.set('Authorization', 'Bearer '+token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + endpoint, options);
  }

  post(endpoint: string, body?: any) {
    let token;
    let headers = new Headers();
    try{
      if(localStorage.getItem('token')) token = localStorage.getItem('token');
    }catch(e){
    }
    if(token) headers.set('Authorization', 'Bearer '+token);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url + endpoint, body, options);
  }

  put(endpoint: string, body?: any) {
    let token;
    let headers = new Headers();
    try{
      if(localStorage.getItem('token')) token = localStorage.getItem('token');
    }catch(e){
    }
    if(token) headers.set('Authorization', 'Bearer '+token);
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.url + endpoint, body, options);
  }

  delete(endpoint: string) {
    let token;
    let headers = new Headers();
    try{
      if(localStorage.getItem('token')) token = localStorage.getItem('token');
    }catch(e){
    }
    if(token) headers.set('Authorization', 'Bearer '+token);
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.url + endpoint, options);
  }

}
