import {
  AfterViewInit,
  ComponentRef,
  Directive,
  ElementRef,
  ViewContainerRef,
  inject,
  input,
} from '@angular/core';
import { SeeMoreComponent } from './see-more/see-more.component';

@Directive({
  selector: '[seeMore]',
  standalone: true,
})
export class SeeMoreDirective implements AfterViewInit {
  private readonly elRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly viewContainerRef = inject(ViewContainerRef);

  limit = input(30);
  seeMoreComponentRef!: ComponentRef<SeeMoreComponent>;

  constructor() {}

  ngAfterViewInit(): void {
    this.seeMoreComponentRef =
      this.viewContainerRef.createComponent(SeeMoreComponent);
    this.seeMoreComponentRef.setInput(
      'text',
      this.elRef.nativeElement.textContent,
    );

    this.elRef.nativeElement.textContent = '';
    this.seeMoreComponentRef.setInput('limit', this.limit());
    this.seeMoreComponentRef.setInput('limit', this.limit() + 1);
  }
}
