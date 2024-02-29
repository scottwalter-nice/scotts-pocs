import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { provideRouter } from '@angular/router';
import { Service1 } from '../service1';

fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideRouter([])
      ]
    })
    .compileComponents();

    const service1:Service1 = TestBed.inject(Service1);
    service1.name = 'Fred Walter';

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const service1:Service1 = TestBed.inject(Service1);
    service1.name = 'Fred Walter';
    expect(component.myname).toEqual('Scott Walter');
  });
});
