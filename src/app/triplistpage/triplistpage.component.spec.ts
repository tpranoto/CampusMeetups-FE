import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriplistpageComponent } from './triplistpage.component';

describe('TriplistComponent', () => {
  let component: TriplistpageComponent;
  let fixture: ComponentFixture<TriplistpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TriplistpageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TriplistpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
