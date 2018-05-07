import { Injectable } from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';

import {environment} from './../../environments/environment';

@Injectable()
export class ApiService {

  url: string;
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

  get(endpoint: string, params?: any) {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + endpoint, options);
  }

  post(endpoint: string, body?: any) {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url + endpoint, body, options);
  }

  put(endpoint: string, body?: any) {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.url + endpoint, body, options);
  }

  delete(endpoint: string) {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.url + endpoint, options);
  }

}
