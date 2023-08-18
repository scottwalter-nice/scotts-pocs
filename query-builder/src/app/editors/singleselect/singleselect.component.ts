import { Component, Inject, Input, Optional, ViewChild, inject } from '@angular/core';
import { PopoverRef } from '../../popover/popover-ref';
import { POPOVER_DATA } from '../../popover/PopoverService';
import { ModalService } from 'nice-solaris-ngx/modal';
import { DropdownComponent } from 'nice-solaris-ngx/dropdown';
import { MatMenuTrigger } from '@angular/material/menu';


@Component({
  selector: 'app-singleselect',
  template: `
    <div style="width: 112px; height: 144px;">
      <button style="visibility: hidden; position: relative; top: -8px;" mat-button #hiddenTrigger="matMenuTrigger" [matMenuTriggerFor]="menu">Hidden</button>
      <mat-menu #menu="matMenu" [overlapTrigger]="true" (closed)="close()">
        <button mat-menu-item *ngFor="let c of teams" (click)="change(c.value)" >{{c.label}}</button>
      </mat-menu>
    </div>
  `,
  styles: ['']
})
export class SingleSelectComponent {
  @ViewChild('hiddenTrigger') hiddenTrigger!: MatMenuTrigger;

  @Input()
  componentConfig: any;

  message!: string;
  model: any;
  placeholder: any;
  selection: any;
  teams: any[];

  static operator = [];

  popoverRef:PopoverRef = inject(PopoverRef);
  data:any = inject(POPOVER_DATA);

  constructor() {
    console.log('POPOVER_DATA', this.data);
    this.teams = this.data.componentConfig.items;
  }

  ngAfterViewInit() {
    setTimeout( () => {
      this.hiddenTrigger.openMenu();
    },1);
  }

  close() {
    this.popoverRef.close();
  }

  change(val: any) {
    this.selection = val;
    this.popoverRef.updateValue(this.selection);
  }
}
