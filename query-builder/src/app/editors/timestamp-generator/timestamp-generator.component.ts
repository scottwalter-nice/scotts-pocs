import { Component, Inject, Optional, inject } from '@angular/core';
import { PopoverRef } from '../../popover/popover-ref';
import { POPOVER_DATA } from '../../popover/PopoverService';

@Component({
  selector: 'app-timestamp-generator',
  template: `
    <p>Value {{selection}}</p>
    <button (click)="updateValue()">Update Value</button>
  `,
  styles: ['']
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
