import { Injectable, EventEmitter } from '@angular/core';
import { CMockDataService } from './c.mockdata.service';
import { CQueryService } from './c.query.service';

@Injectable()
export class CService {
    private _data: Array<number>;

    constructor(
      private _mock: CMockDataService
      ) {}

    getData(): Array<number> {
        return this._mock.getData();
    }

}
