/// <reference path="../../typings/index.d.ts" />
// declare let __moduleName : string;

import { Component, ViewChild, Injector } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { CComponent } from './subfolder/c.component';
import { MockDataService, QueryService } from './services/services';

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
    <div style="width:1440px;height:600px;">
      <c #myChild [parentMsg]="msg" serviceTarget="mock" style="float:left"></c>
      <c [parentMsg]="msg" serviceTarget="query" style="float:right"></c>
    </div>
  `,
  directives: [CComponent],
  providers: [MockDataService, QueryService, HTTP_PROVIDERS]
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
