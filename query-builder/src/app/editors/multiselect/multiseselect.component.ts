import { Component, Inject, Optional, inject } from '@angular/core';
import { PopoverRef } from '../../popover/popover-ref';
import { POPOVER_DATA } from '../../popover/PopoverService';

@Component({
  selector: 'app-multiselect',
  template: `
    <sol-dropdown
    ariaLabel="test"
    ariaLabelledBy="other"
    [isInPopover]="true"
    [options]="users"
    optionsValue="value"
    optionsLabel="label"
    [isMultiple]="true"
    [isVirtual]="false"
    [disabled]="false"
    [placeholder]="'Select users'"
    [(selection)]="selection"
    [(ngModel)]="selection"
    [required]="false"
    (selectionChange)="change()"
    (closed)="close()"
    ></sol-dropdown>
  `,
  styles: ['']
})
export class MultiSelectComponent {

  selection!: any;
  users = [
    {value: 'a1a1', label: 'Mickey Mouse' },
    {value: 'b2b2', label: 'Minnie Mouse' },
    {value: 'c3c3', label: 'Donald Duck' },
    {value: 'd4d4', label: 'Daisy Duck' },
    {value: 'e5e5', label: 'Goofy' },
    {value: 'f6f6', label: 'Mortimer Mouse' },
    {value: 'g7g7', label: 'Oswald the Lucky Rabbit' }
  ];
  popoverRef:PopoverRef = inject(PopoverRef);
  data:any = inject(POPOVER_DATA);

  constructor() {}

  close() {
    this.popoverRef.close();
  }

  change() {
    this.popoverRef.updateValue(this.selection);
  }

}
