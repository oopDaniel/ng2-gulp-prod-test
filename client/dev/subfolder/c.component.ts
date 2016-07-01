import { Component, Input } from '@angular/core';
import { DonutGraph } from '../donut/donut.component';
import { CService } from './c.service';
import { HTML } from './c.component.html';
// declare let __moduleName : string;

@Component({
  // moduleId: __moduleName,
  selector: 'c',
  // styleUrls: ['./c.component.css'],
  styles: [`
  .child-cmp-container {
    border: 3px dotted darkmagenta;
    box-sizing: border-box;
    margin: 20px 10px;
    padding: 0 20px 20px;
    width: 720px;
  }
  `],
  template: HTML,
  directives: [DonutGraph],
  providers: [CService]
})
export class CComponent {
  @Input('parentMsg') pMsg: string;
  msg: string               = 'A message from child component!';
  isBtnClicked: boolean     = false;
  chartData: Array<number>  = [53245, 28479, 19697, 24037, 40245];
  private _msgCache: string = '';

  constructor(private _data: CService) {
    _data.getData().subscribe( d => {
      console.log('chart data:', d)
      this.chartData = d;
    });
  }

  changeMsg(msg: string) {
    if (this.isBtnClicked) {
      this.msg       = this._msgCache;
    }
    else {
      this._msgCache = this.msg;
      this.msg       = msg || 'Changed message!'
    }
    this.isBtnClicked = !this.isBtnClicked;
  }

  setMsgAfter5Sec() {
    setTimeout(() => this.msg = 'Set message after 5 seconds!', 5000);
  }
}
