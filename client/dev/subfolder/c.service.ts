import { Injectable, EventEmitter } from '@angular/core';
import { MockDataService, QueryService } from './../services/services';

@Injectable()
export class CService {
    private _data: Array<number>;

    constructor(
      private _mock: MockDataService
      // private _mock: QueryService
      ) {}

    getData(): Observable<any> {
        return this._mock.getData();
    }

}
