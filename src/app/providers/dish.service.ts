import { Injectable } from '@angular/core';
import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import { baseURL } from '../../shared/baseurl';
import { ProcessHttpmsgService } from '../providers/process-httpmsg.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

/*
  Generated class for the DishProvider provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DishProvider {


  constructor(public http: Http,
              private processHTTPMsgService: ProcessHttpmsgService) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get(baseURL + 'dishes')
            .map(res => {return this.processHTTPMsgService.extractData(res)})
            .catch(err => {return this.processHTTPMsgService.handleError(err)})
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get(baseURL + 'dishes/' + id)
            .map(res => {return this.processHTTPMsgService.extractData(res)})
            .catch(err => {return this.processHTTPMsgService.handleError(err)})

  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get(baseURL + 'dishes?featured=true')
            .map(res => {return this.processHTTPMsgService.extractData(res)[0]})
            .catch(err => {return this.processHTTPMsgService.handleError(err)})

  }

}