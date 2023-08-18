import { Component, Inject, Input, Optional, inject } from '@angular/core';
import { PopoverRef } from '../../popover/popover-ref';
import { POPOVER_DATA } from '../../popover/PopoverService';

@Component({
  selector: 'app-timestamp-generator',
  template: `
    <div>
      <p>Value {{selection}}</p>
      <button (click)="updateValue()">Update Value</button>
    </div>
  `,
  styles: [`
    div {padding: 20px;}
    p {margin-top: 0;}
  `]
})
export class TimestampGeneratorComponent {

  selection!: any;
  popoverRef:PopoverRef = inject(PopoverRef);
  data:any = inject(POPOVER_DATA);

  constructor() {}

  updateValue() {
    this.selection = new Date().getTime();
    this.popoverRef.updateValue(this.selection);
  }
}
