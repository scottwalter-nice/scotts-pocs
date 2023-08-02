import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, Portal, TemplatePortal } from '@angular/cdk/portal';
import { Component, ComponentRef, EmbeddedViewRef, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser'
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { PopoverRef } from './popover-ref';

/**
 * Internal component that wraps user-provided popover content.
 */
@Component({
  selector: 'p1-popover',
  template: `
    <ng-template [cdkPortalOutlet]="selectedPortal"></ng-template>
    <div class="arrow" popoverArrow></div>
  `,
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements AfterViewInit {

  selectedPortal!: ComponentPortal<any>;

  constructor() {}

  attachComponentPortal<T>(componentPortal: ComponentPortal<any>) {
    this.selectedPortal = componentPortal;
  }

  ngAfterViewInit() {}
}
