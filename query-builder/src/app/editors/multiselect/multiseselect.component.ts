import { Component, Inject, Optional } from '@angular/core';
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


  constructor(
    private popoverRef: PopoverRef<any>,
    @Optional() @Inject(POPOVER_DATA) public data?: any
  ) {
  }

  updateValue() {
    this.selections = new Date().getTime();
    this.popoverRef.selectionChanged(this.selections);
  }
}
