import { Component, Input, ReflectiveInjector, Attribute } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { DonutGraph } from '../donut/donut.component';
import { CService } from './c.service';
import { QueryService, MockDataService } from './../services/services';
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
    width: 80%;
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


  constructor(
    @Attribute('serviceTarget') serviceTarget: string
    // private _data: CService
    ) {
    let injector = ReflectiveInjector.resolveAndCreate([
      { provide: "cService", useClass: QueryService,    multi: true },
      { provide: "cService", useClass: MockDataService, multi: true },
      HTTP_PROVIDERS
    ]);

    let _index = serviceTarget === 'mock' ? 0 : 1;
    let data = injector.get('cService')[_index];
    data.getData()
    .subscribe( d => {
      this.chartData = d;
    });

// _data.getData()
//     .subscribe( d => {
//       console.log('chart data:', d)
//       this.chartData = d;
//     });
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
