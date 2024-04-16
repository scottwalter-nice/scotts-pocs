import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationContainerComponent } from './conversation-container.component';

describe('ConversationContainerComponent', () => {
  let component: ConversationContainerComponent;
  let fixture: ComponentFixture<ConversationContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversationContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConversationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
