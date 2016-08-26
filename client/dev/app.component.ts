/// <reference path="../../typings/index.d.ts" />

import { Component } from '@angular/core';
import { CComponent } from './c.component';
// let CComponent = require('./c.component');

@Component({
  selector: 'my-app',
  template: '<h1><div class="cc">My First Angular 2 App</div></h1><c></c>',
  styles: [require('./test.scss')],
  directives: [CComponent]
})
export class AppComponent { }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
