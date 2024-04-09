import {
  ApplicationRef,
  Component,
  EnvironmentInjector,
  OnInit,
  createComponent,
  inject,
} from '@angular/core';
import { FooComponent } from '../foo/foo.component';

@Component({
  selector: 'dynamic',
  standalone: true,
  imports: [],
  template: `<div id="dynamic-host"></div>`,
  styleUrl: './dynamic.component.scss',
})
export class DynamicComponent implements OnInit {
  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly appRef = inject(ApplicationRef);

  //const hostElement = document.getElementById('dynamic-host');
  //

  public ngOnInit(): void {
    const container = createComponent(FooComponent, {
      environmentInjector: this.environmentInjector,
    });
    //document.body.appendChild(container.location.nativeElement);

    const hostElement = document.body;
    //const hostElement = document.getElementById('dynamic-host');
    hostElement?.appendChild(container.location.nativeElement);
    this.appRef.attachView(container.hostView);
  }
}
