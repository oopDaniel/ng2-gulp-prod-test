import { Component } from '@angular/core';
import { CComponent } from './c.component';

@Component({
  selector: 'my-app',
  template: '<h1>My First Angular 2 App</h1><c></c>',
  directives: [CComponent]
})
export class AppComponent { }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
