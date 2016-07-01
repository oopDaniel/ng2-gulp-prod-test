import { Injectable, Optional, Injector, ReflectiveInjector } from '@angular/core';
import { MockDataService, QueryService } from './../services/services';

@Injectable()
export class CService {
    private _data: Array<number>;

    constructor(
      private _mock: MockDataService
      // private _mock: QueryService
         // @Optional(MockDataService) _mock,
      // @Optional(QueryService) _mock
      ) {}

    getData(): Observable<any> {
        return this._mock.getData();
    }

}
