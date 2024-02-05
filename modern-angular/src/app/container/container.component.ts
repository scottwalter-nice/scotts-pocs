import { Component, ViewEncapsulation } from '@angular/core';
import { NotAContainerComponent } from '../not-acontainer/not-acontainer.component';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [NotAContainerComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ContainerComponent {

}
