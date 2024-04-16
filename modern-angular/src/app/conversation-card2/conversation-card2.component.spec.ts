import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationCard2Component } from './conversation-card2.component';

describe('ConversationCard2Component', () => {
  let component: ConversationCard2Component;
  let fixture: ComponentFixture<ConversationCard2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversationCard2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConversationCard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
