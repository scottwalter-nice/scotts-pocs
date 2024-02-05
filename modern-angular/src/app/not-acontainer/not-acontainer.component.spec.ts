import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAContainerComponent } from './not-acontainer.component';

describe('NotAContainerComponent', () => {
  let component: NotAContainerComponent;
  let fixture: ComponentFixture<NotAContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotAContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotAContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
