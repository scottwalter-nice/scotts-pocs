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
    <ng-container #portalOutlet></ng-container>
    <div class="arrow" popoverArrow></div>

    <!-- [style.left.px]="arrowLeft"
      [style.bottom.px]="arrowBottom"
      [style.right.px]="arrowRight" -->
  `,
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements AfterViewInit {

  selectedPortal!: ComponentPortal<any>;
  @ViewChild(CdkPortalOutlet)
  portalOutlet!: CdkPortalOutlet;

  // @ViewChild(CdkPortalOutlet) portalOutlet!: CdkPortalOutlet;

  constructor() {
  }

  // // @ViewChild(CdkPortalOutlet, { static: false }) portalOutlet!: CdkPortalOutlet;

  // selectedPortal!: CdkPortalOutlet;


  // attachComponentPortal<T>(componentPortal: ComponentPortal<any>): ComponentRef<T> {
  //   console.log('q1', this.selectedPortal);
  //   // console.log('RRRR', this.portalOutlet);
  //   return this.selectedPortal.attachComponentPortal(componentPortal);
  // }

  // attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
  //   return this.selectedPortal.attachTemplatePortal(portal);
  // }


  attachComponentPortal<T>(componentPortal: ComponentPortal<any>) {
    this.selectedPortal = componentPortal;
  }

  //   attachComponentPortal<T>(componentPortal: ComponentPortal<any>): ComponentRef<T> {
  //   console.log('RRRR', this.portalOutlet);
  //   return this.portalOutlet.attachComponentPortal(componentPortal);
  // }


  ngAfterViewInit() {
  }
}
