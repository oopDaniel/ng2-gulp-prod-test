/// <reference path="../../typings/index.d.ts" />
// declare let __moduleName : string;

import { Component, ViewChild } from '@angular/core';
import { CComponent } from './subfolder/c.component';
import { CMockDataService } from './subfolder/c.mockdata.service';
import { CQueryService } from './subfolder/c.query.service';

@Component({
  // moduleId: __moduleName,
  selector: 'my-app',
  styles: [`
    input {
      display: block;
      width: 300px;
      margin-bottom: 30px;
      padding-left: 5px;
    }
  `],
  template: `
    <h1>My First Angular 2 App</h1>
    <input [(ngModel)]="cm.msg">
    <button (click)="passMsgByAttr(btnAttr)" #btnAttr>Parent: Pass Msg by attribute</button>
    <button (click)="setMsgByViewChild()">Parent: {{cm.isBtnClicked?'Restore':'Set Msg by viewChild'}}</button>
    <c #myChild [parentMsg]="msg"></c>
  `,
  directives: [CComponent],
  providers: [CMockDataService, CQueryService]
})
export class AppComponent {
  @ViewChild('myChild') cm: CComponent;
  msg: string = undefined;

  passMsgByAttr(eleRef: any) {
    let msg   = 'Message passed by attribute',
        isSet = this.msg === msg;

    this.msg = isSet ?  '' : 'Message passed by attribute';
    eleRef.innerHTML = `Parent: ${isSet ? 'Pass Msg by attribute' : 'Remove'}`
  }

  setMsgByViewChild() {
    this.cm.changeMsg('Message set by viewChild');
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
