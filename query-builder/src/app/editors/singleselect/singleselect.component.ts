import { Component, Inject, Optional } from '@angular/core';
import { PopoverRef } from '../../popover/popover-ref';
import { POPOVER_DATA } from '../../popover/PopoverService';

@Component({
  selector: 'app-singleselect',
  template: `
    <p>Single Select! {{message}}</p>
    <button (click)="close()">Close IT</button>
  `,
  styles: ['']
})
export class SingleSelectComponent {

  message!: string;

  static operator = [];

  constructor(
    private popoverRef: PopoverRef,
    @Optional() @Inject(POPOVER_DATA) public data?: any
  ) {
   this.message = this.data;
  }

  close() {
    this.popoverRef.close([1,3,3]);
  }
}
