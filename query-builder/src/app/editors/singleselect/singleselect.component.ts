import { Component, Inject, Optional } from '@angular/core';
import { PopoverRef } from '../../popover/popover-ref';
import { POPOVER_DATA } from '../../popover/PopoverService';

@Component({
  selector: 'app-singleselect',
  template: `
    <p>Single Select! {{message}}</p>
    <button (click)="close()">Close Editor</button>
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
    this.data.selectedValue = new Date().getTime();
    const teams = ['Team A', 'Team B', 'Team C'];
    const random = Math.floor(Math.random() * teams.length);
    this.data.selectedValue = teams[random];
    this.popoverRef.close(this.data);
  }
}
