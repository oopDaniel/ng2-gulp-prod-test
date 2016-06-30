import { Component, Input } from '@angular/core';
declare let __moduleName : string;

@Component({
  moduleId: __moduleName,
  selector: 'c',
  styleUrls: ['./c.component.css'],
  templateUrl: './c.component.html'
})
export class CComponent {
  @Input('parentMsg') pMsg: string;
  msg: string               = 'A message from child component!';
  isBtnClicked: boolean     = false;
  private _msgCache: string = '';

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
