import { Component } from '@angular/core';

@Component({
  selector: 'foo',
  standalone: true,
  imports: [],
  templateUrl: './foo.component.html',
  styleUrl: './foo.component.scss',
})
export class FooComponent {
  doIt() {
    console.log('Hello There');
  }
}
