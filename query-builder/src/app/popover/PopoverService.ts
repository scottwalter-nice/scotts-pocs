import { ElementRef, Injectable, InjectionToken, Injector } from "@angular/core";

import { ComponentType, Overlay, OriginConnectionPosition, OverlayConnectionPosition, ConnectionPositionPair } from '@angular/cdk/overlay';
import { PopoverConfig } from "./popover-config";
import { PopoverRef } from "./popover-ref";
import { ComponentPortal, PortalInjector } from "@angular/cdk/portal";
import { PopoverComponent } from "./popover.component";

export const POPOVER_DATA = new InjectionToken('popover.data');

const defaultConfig: PopoverConfig = {
  backdropClass: '',
  disableClose: false,
  panelClass: '',
  arrowOffset: 30,
  arrowSize: 20
};


@Injectable({
  providedIn: 'root'
})
export class PopoverService {
  constructor(private overlay: Overlay, private injector: Injector) { }

  open<D = any>(component: ComponentType<any>, target: ElementRef | HTMLElement, config: Partial<PopoverConfig> = {}): PopoverRef<D> {
    const popoverConfig: PopoverConfig = Object.assign({}, defaultConfig, config);

    const arrowSize = popoverConfig.arrowSize ? popoverConfig.arrowSize : 20;
    const arrowOffset = popoverConfig.arrowOffset ? popoverConfig.arrowOffset  : 30;
    const panelOffset = arrowSize / 2;

    // preferred positions, in order of priority
    const positions: ConnectionPositionPair[] = [
      // top center
      {
        overlayX: 'center',
        overlayY: 'bottom',
        originX: 'center',
        originY: 'top',
        panelClass: ['bottom', 'center'],
        offsetY: -1 * panelOffset
      },
      // top left
      {
        overlayX: 'start',
        overlayY: 'bottom',
        originX: 'center',
        originY: 'top',
        panelClass: ['bottom', 'left'],
        offsetX: -1 * arrowOffset,
        offsetY: -1 * panelOffset
      },
      // top right
      {
        overlayX: 'end',
        overlayY: 'bottom',
        originX: 'center',
        originY: 'top',
        panelClass: ['bottom', 'right'],
        offsetX: arrowOffset,
        offsetY: -1 * panelOffset
      },
      // bottom center
      {
        overlayX: 'center',
        overlayY: 'top',
        originX: 'center',
        originY: 'bottom',
        panelClass: ['top', 'center'],
        offsetY: panelOffset
      },
      // bottom left
      {
        overlayX: 'start',
        overlayY: 'top',
        originX: 'center',
        originY: 'bottom',
        panelClass: ['top', 'left'],
        offsetX: -1 * arrowOffset,
        offsetY: panelOffset
      },
      // bottom right
      {
        overlayX: 'end',
        overlayY: 'top',
        originX: 'center',
        originY: 'bottom',
        panelClass: ['top', 'right'],
        offsetX: arrowOffset,
        offsetY: panelOffset
      }
    ];


    const positionStrategy = this.overlay
        .position()
        .flexibleConnectedTo(target)
        .withPush(false)
        .withFlexibleDimensions(false)
        .withPositions(positions);

    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });

    const popoverRef = new PopoverRef(overlayRef, positionStrategy, popoverConfig);
    const portalInjector  = Injector.create({
      parent: this.injector,
      providers: [
          { provide: POPOVER_DATA, useValue: Object.assign({}, config.data) },
          { provide: PopoverRef, useValue: popoverRef }
      ]
    });

    const popover = overlayRef.attach(new ComponentPortal(
      PopoverComponent,
      null,
      portalInjector
    )).instance;

    popover.attachComponentPortal(
      new ComponentPortal(
        component,
        null,
        portalInjector
      )
    );

    return popoverRef;
  }
}
