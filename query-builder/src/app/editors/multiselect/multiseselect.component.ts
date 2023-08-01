import { Component, Inject, Optional } from '@angular/core';
import { PopoverRef } from '../../popover/popover-ref';
import { POPOVER_DATA } from '../../popover/PopoverService';

@Component({
  selector: 'app-multiselect',
  template: `
    <p>Multi Select! {{message}}</p>
    <button (click)="close()">Close Editor</button>
  `,
  styles: ['']
})
export class MultiSelectComponent {

  message!: string;

  constructor(
    private popoverRef: PopoverRef<any>,
    @Optional() @Inject(POPOVER_DATA) public data?: any
  ) {
    this.message = this.data;
  }

  close() {
    this.data.selectedValue = new Date().getTime();
    this.popoverRef.close(this.data);
  }
}
