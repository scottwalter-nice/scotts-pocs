import { Component, Inject, Input, Optional, inject } from '@angular/core';
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
  ];

  static operator = [];

  popoverRef:PopoverRef = inject(PopoverRef);
  data:any = inject(POPOVER_DATA);

  constructor() {
    console.log('POPOVER_DATA', this.data);
    this.teams = this.data.componentConfig.items;
  }

  close() {
    this.popoverRef.close();
  }

  change() {
    this.popoverRef.updateValue(this.selection);
  }
}
