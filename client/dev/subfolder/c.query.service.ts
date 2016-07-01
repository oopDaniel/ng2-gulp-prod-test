import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const URL = 'http://localhost:8000/client/dev/data/chart-data.json';

@Injectable()
export class CQueryService {

    constructor( @Inject(Http) private _http: Http) { }

    getData(): Observable<any> {
        return this._http
          .get(URL)
          .map((r) => r.json())
          .catch(this._errorHandle);
    }

    private _errorHandle(error: any) {
        let errMsg = (error.message) ?
          error.message
          :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
          console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
