import { ApplicationRef, ChangeDetectorRef, Component, ElementRef, EnvironmentInjector, TemplateRef, Type, ViewEncapsulation, createComponent, inject, viewChild, viewChildren } from '@angular/core';
import { ConversationCardComponent } from '../conversation-card/conversation-card.component';
import { JsonPipe } from '@angular/common';

export type Content<T> = string | TemplateRef<T> | Type<T>;

@Component({
  selector: 'conversation-container',
  standalone: true,
  imports: [JsonPipe, ConversationCardComponent],
  templateUrl: './conversation-container.component.html',
  styleUrl: './conversation-container.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ConversationContainerComponent {
  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly appRef = inject(ApplicationRef);
  private cardIndex = 0;
  private cdr = inject(ChangeDetectorRef);
  cardData:any[] = [];

  divEl = viewChildren<TemplateRef<any>>('el');

  addCard() {
    const hostElement = document.querySelector('.cards');

    this.cardData.push({index: this.cardIndex, now: new Date()});
    this.cdr.detectChanges();

    const card = createComponent(ConversationCardComponent, {
      environmentInjector: this.environmentInjector,
      // projectableNodes:[
      //   this.createNgContent('Hello', 'first'),
      //   this.createNgContent('World', 'second'),
      //   this.createNgContent(this.divEl() as TemplateRef<any>)
      // ]
    });

    card.setInput('template', this.divEl()[this.cardIndex]);
    card.instance.onButtonClicked.subscribe(val => console.log(val));
    hostElement?.appendChild(card.location.nativeElement);
    this.appRef.attachView(card.hostView);

    this.cardIndex++;
  }

  createNgContent<T>(content: Content<T>, customClass?: string) {
    if (typeof content === 'string') {
      const element = document.createElement('div');

      if (customClass) {
        element.classList.add(customClass);
      }
      element.innerHTML=content;
      //return [[element]];
      return [element];
    }

    if (content instanceof TemplateRef) {
      const viewRef = content.createEmbeddedView(content.elementRef.nativeElement);
      //return [viewRef.rootNodes];
      return viewRef.rootNodes;
    }
   //return [[]]
   return []
  }

  singleCardButtonClicked() {
    console.log('Button clicked');
  }
}
