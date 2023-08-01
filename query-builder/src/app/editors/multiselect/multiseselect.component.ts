import { Component, Inject, Optional } from '@angular/core';
import { PopoverRef } from '../../popover/popover-ref';
import { POPOVER_DATA } from '../../popover/PopoverService';

@Component({
  selector: 'app-multiselect',
  template: `
    <p>Multi Select! {{message}}</p>
    <button (click)="close()">Close IT</button>
  `,
  styles: ['']
})
export class MultiSelectComponent {

  message!: string;

  constructor(
    private popoverRef: PopoverRef<string>,
    @Optional() @Inject(POPOVER_DATA) public data?: any
  ) {
    this.message = this.data;
  }

  close() {
    this.popoverRef.close('NEATO');
  }
}
