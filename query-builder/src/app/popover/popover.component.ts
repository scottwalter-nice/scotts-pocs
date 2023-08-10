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
  styles: [`
    :host {
      position: relative;
      background: white;
      border-radius: 8px;
      padding: 20px;
    }

    .arrow {
      position: absolute;
      background: inherit;
      z-index: -1;
    }

    :host-context(.center) .arrow {
      left: 50%;
    }

    :host-context(.top.left, .top.center) .arrow {
      transform-origin: top left;
      transform: rotate(45deg);
    }

    :host-context(.top.right) .arrow {
      transform-origin: top right;
      transform: rotate(-45deg);
    }

    :host-context(.bottom.left, .bottom.center) .arrow {
      transform-origin: bottom left;
      transform: rotate(-45deg);
    }

    :host-context(.bottom.right) .arrow {
      transform-origin: bottom right;
      transform: rotate(45deg);
    }
  `
  ]
})
export class PopoverComponent implements AfterViewInit {

  selectedPortal!: ComponentPortal<any>;

  constructor() {}

  attachComponentPortal<T>(componentPortal: ComponentPortal<any>) {
    this.selectedPortal = componentPortal;
  }

  ngAfterViewInit() {}
}
