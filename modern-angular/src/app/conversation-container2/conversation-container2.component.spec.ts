import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationContainer2Component } from './conversation-container2.component';

describe('ConversationContainer2Component', () => {
  let component: ConversationContainer2Component;
  let fixture: ComponentFixture<ConversationContainer2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversationContainer2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConversationContainer2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
