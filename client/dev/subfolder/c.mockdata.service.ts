import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class CMockDataService {
    private _data: Array<number> = [20, 30];

    getData() {
        return this._data;
    }

    setData(data: Array<number>) {
        if ( data.length > 1 && typeof data[0] === 'number' ) {
            this._data = data;
        }
    }
}
