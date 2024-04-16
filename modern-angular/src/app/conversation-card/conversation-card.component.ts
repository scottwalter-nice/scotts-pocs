import { NgTemplateOutlet } from '@angular/common';
import { Component, Input, output, TemplateRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'conversation-card',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './conversation-card.component.html',
  styleUrl: './conversation-card.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ConversationCardComponent {

  @Input()
  public template: TemplateRef<any> | null = null;

  onButtonClicked = output<string>(); // OutputEmitterRef<string>

  onClick() {
    this.onButtonClicked.emit('Button clicked');
  }

}
