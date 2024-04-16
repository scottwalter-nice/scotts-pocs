import { Component } from '@angular/core';
import { ConversationCard2Component, CardFooterDirective, CardHeaderDirective, CardContentDirective } from '../conversation-card2/conversation-card2.component';

@Component({
  selector: 'conversation-container2',
  standalone: true,
  imports: [ConversationCard2Component, CardFooterDirective, CardHeaderDirective, CardContentDirective],
  templateUrl: './conversation-container2.component.html',
  styleUrl: './conversation-container2.component.scss'
})
export class ConversationContainer2Component {
  cardData: any[] = [];

 addCard() {
  this.cardData.push({
    now: new Date()
  });
 }

 updateContent() {
  this.cardData[0].now = new Date();
  this.cardData = [...this.cardData];

 }
}
