import { Component, input, signal, computed } from '@angular/core';

@Component({
  selector: 'app-see-more',
  standalone: true,
  template: `
    {{ truncatedText() }}
    @if (text().length > limit() && !seeMore()) {
      <button (click)="seeMore.set(true)">See More</button>
    } @else if (text().length > limit()) {
      <button (click)="seeMore.set(false)">See Less</button>
    }
  `,
})
export class SeeMoreComponent {
  text = input.required<string>();
  limit = input(30);
  seeMore = signal(false);
  truncatedText = computed(() => {
    return this.text().length > this.limit() && !this.seeMore()
      ? this.text().slice(0, this.limit()) + '...'
      : this.text();
  });
}
