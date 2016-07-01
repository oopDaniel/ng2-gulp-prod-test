import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MockDataService {
    private _data: Array<number> = [20, 200];

    getData() {
      return Observable.create( ob => {
          ob.next(this._data);
      })
    }
}
