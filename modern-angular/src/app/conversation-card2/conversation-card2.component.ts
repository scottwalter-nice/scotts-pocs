import { NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'conversation-card-footer',
  standalone: true,
})
export class CardFooterDirective {}

@Directive({
  selector: 'conversation-card-header',
  standalone: true,
})
export class CardHeaderDirective {}

@Directive({
  selector: '[conversationCardMainContent]',
  standalone: true,
})
export class CardContentDirective {
  constructor(public template: TemplateRef<any>) {}
}

@Component({
  selector: 'conversation-card2',
  standalone: true,
  imports: [NgTemplateOutlet, NgIf],
  templateUrl: './conversation-card2.component.html',
  styleUrl: './conversation-card2.component.scss'
})
export class ConversationCard2Component {
  @ContentChild(CardContentDirective) carMainContent?: CardContentDirective;
}
