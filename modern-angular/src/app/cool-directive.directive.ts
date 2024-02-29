import { Directive } from '@angular/core';

@Directive({
  selector: '[appCoolDirective]',
  standalone: true
})
export class CoolDirectiveDirective {

  constructor() {
    console.log('hello from cool directive!');
  }

}
