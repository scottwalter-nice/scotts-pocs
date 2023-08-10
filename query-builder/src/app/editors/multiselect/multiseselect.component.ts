import { Component, Inject, Optional, inject } from '@angular/core';
import { PopoverRef } from '../../popover/popover-ref';
import { POPOVER_DATA } from '../../popover/PopoverService';

@Component({
  selector: 'app-multiselect',
  template: `
    <p>Multi Select! {{selections }}</p>
    <button (click)="updateValue()">Update Value</button>
  `,
  styles: ['']
})
export class MultiSelectComponent {

  selections!: any;
  popoverRef:PopoverRef = inject(PopoverRef);
  data:any = inject(POPOVER_DATA);

  constructor() {}

  updateValue() {
    this.selections = new Date().getTime();
    this.popoverRef.updateValue(this.selections);
  }
}
