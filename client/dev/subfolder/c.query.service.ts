import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class CQueryService {
    private _data: Array<number> = [50, 100];

    getData() {
        return this._data;
    }

    setData(data: Array<number>) {
        if ( data.length > 1 && typeof data[0] === 'number' ) {
            this._data = data;
        }
    }
}
