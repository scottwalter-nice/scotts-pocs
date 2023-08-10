import { OverlayRef, FlexibleConnectedPositionStrategy, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { PopoverConfig } from './popover-config';

/**
 * Reference to a popover opened via the Popover service.
 */
export class PopoverRef<T = any> {
  private afterClosedSubject = new Subject<T>();
  private selectionChangedSubject = new Subject<T>();
  private currentSelection!:any;

  constructor(private overlayRef: OverlayRef,
              private positionStrategy: FlexibleConnectedPositionStrategy,
              public config: PopoverConfig) {


    if (!config.disableClose) {
      this.overlayRef.backdropClick().subscribe(() => {
        this.close();
      });

      this.overlayRef.keydownEvents().pipe(
        filter(event => event.key === 'Escape')
      ).subscribe(() => {
        this.close();
      });
    }
  }

  // To close the popover
  close(): void {
    if (this.currentSelection) {
      this.afterClosedSubject.next(this.currentSelection);
    }

    this.afterClosedSubject.complete();
    this.overlayRef.dispose();
  }

  // An observable which can subscribed to when the popover is closed
  afterClosed(): Observable<T> {
    return this.afterClosedSubject.asObservable();
  }

  positionChanges(): Observable<ConnectedOverlayPositionChange> {
    return this.positionStrategy.positionChanges;
  }

  // API a custom component will call when the state of the custom component has changed
  selectionChanged(value: any) {
    this.currentSelection = value;
    this.selectionChangedSubject.next(value);
  }

  // An observable which can subscribed to when the state of the custom component has changed
  selectionChanges(): Observable<T> {
    return this.selectionChangedSubject.asObservable();
  }
}