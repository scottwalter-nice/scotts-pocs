import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-tab2',
  standalone: true,
  imports: [],
  templateUrl: './tab2.component.html',
  styleUrl: './tab2.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class Tab2Component implements OnInit, OnDestroy {

  date = new Date().getTime();
  constructor() {
    console.log('Tab2Component constructor');
  }

  ngOnInit(): void {
    console.log('Tab2Component ngOnInit');
  }

  ngOnDestroy(): void {
    console.log('Tab2Component ngOnDestroy');
  }
}
