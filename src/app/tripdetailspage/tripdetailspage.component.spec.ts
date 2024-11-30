import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripdetailspageComponent } from './tripdetailspage.component';

describe('TripdetailspageComponent', () => {
  let component: TripdetailspageComponent;
  let fixture: ComponentFixture<TripdetailspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TripdetailspageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TripdetailspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
