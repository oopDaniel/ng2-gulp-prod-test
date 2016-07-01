import { Injectable } from '@angular/core';

@Injectable()
export class CMockDataService {
    private _data: Array<number> = [20, 30];

    getData() {
        return this._data;
    }
}
