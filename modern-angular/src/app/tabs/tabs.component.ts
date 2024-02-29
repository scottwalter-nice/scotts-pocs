import { Component, ViewEncapsulation, signal } from '@angular/core';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { Tab1Component } from './tab1/tab1.component';
import { Tab2Component } from './tab2/tab2.component';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [MatTabGroup, MatTab, Tab1Component, Tab2Component],
  encapsulation: ViewEncapsulation.None,
  template:`
    <h2>Tab Group {{selectedTabIndex()}}</h2>
    <mat-tab-group (selectedIndexChange)="selectedTabIndex.set($event)">
      <mat-tab label="First">
        @defer(when selectedTabIndex() === 0; prefetch on idle) {
          <app-tab1></app-tab1>
        }
      </mat-tab>
      <mat-tab label="Second">
        @defer(when selectedTabIndex() === 1; prefetch on idle) {
          <app-tab2></app-tab2>
        }
      </mat-tab>
    </mat-tab-group>
  `,
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {

  selectedTabIndex = signal(0);
  prefetchTabs = signal(true);
}
