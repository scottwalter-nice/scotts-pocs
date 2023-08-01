import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuerychipComponent } from './querychip.component';

describe('QuerychipComponent', () => {
  let component: QuerychipComponent;
  let fixture: ComponentFixture<QuerychipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuerychipComponent]
    });
    fixture = TestBed.createComponent(QuerychipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
