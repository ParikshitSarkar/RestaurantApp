import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import 'rxjs/add/observable/throw';
import { jsonpFactory } from '@angular/http/src/http_module';

/*
  Generated class for the ProcessHttpmsgProvider provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProcessHttpmsgService {

  constructor(public http: Http) {
    console.log('Hello ProcessHttpmsgProvider Provider');
  }

  public extractData(res:Response){
    let body = res.json()
    return body || { }
  }

  public handleError(error:Response | any ){
    let errMsg:string 

    if(error instanceof Response){
      const body = error.json() || ''
      const err = body.error || JSON.stringify(body)
      errMsg = `${error.status} - ${error.statusText || ''} ${err} `
    }else{
      errMsg = error.message ? error.message : error.toString()
    }
    console.log('Error Message   ',errMsg)
    return Observable.throw(errMsg)
  }

  /*public handleError(err:Response){
      var errBody = err.text() || ''
      //var errBody = JSON.stringify(err, ["message", "arguments", "type", "name"])
      var errMsg = errBody 
      console.log('err msg   ',errMsg)
      return Observable.throw(errMsg)      
  }*/

}