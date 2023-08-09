import { Component, Inject, Input, Optional } from '@angular/core';
import { PopoverRef } from '../../popover/popover-ref';
import { POPOVER_DATA } from '../../popover/PopoverService';
import { ModalService } from 'nice-solaris-ngx/modal';
import { DropdownComponent } from 'nice-solaris-ngx/dropdown';


@Component({
  selector: 'app-singleselect',
  template: `
    <button style="float: right;" (click)="close()">×</button>
    <sol-dropdown
        ariaLabel="test"
        ariaLabelledBy="other"
        [options]="teams"
        optionsValue="value"
        optionsLabel="label"
        [isMultiple]="false"
        [isVirtual]="false"
        [label]="'Label'"
        [disabled]="false"
        [placeholder]="'Select a team'"
        [(selection)]="selection"
        [(ngModel)]="selection"
        [required]="false"
        (selectionChange)="change()"
        (closed)="close()"
        >
      </sol-dropdown>
  `,
  styles: ['']
})
export class SingleSelectComponent {

  @Input()
  componentConfig: any;

  message!: string;
  model: any;
  placeholder: any;
  selection: any;
  teams = [
    { value: 'a1a1a1', label: 'Team A' },
    { value: 'b2b2b2', label: 'Team B' },
    { value: 'c3c3c3', label: 'Team C' }
  ];

  static operator = [];

  constructor(
    private popoverRef: PopoverRef,
    @Optional() @Inject(POPOVER_DATA) public data?: any
  ) { }

  close() {
    this.popoverRef.close();
  }

  change() {
    this.popoverRef.selectionChanged(this.selection);
  }
}
