import { Component } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'c',
  template: '<div class="test-style"><h2>Hello World</h2></div>',
  styles: [require('./c.component.scss')],
  // encapsulation: ViewEncapsulation.None
})
export class CComponent { }
