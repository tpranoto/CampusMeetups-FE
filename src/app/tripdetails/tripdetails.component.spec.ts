import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripdetailsComponent } from './tripdetails.component';

describe('TripdetailsComponent', () => {
  let component: TripdetailsComponent;
  let fixture: ComponentFixture<TripdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TripdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
