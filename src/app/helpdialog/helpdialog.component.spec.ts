import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpdialogComponent } from './helpdialog.component';

describe('HelpdialogComponent', () => {
  let component: HelpdialogComponent;
  let fixture: ComponentFixture<HelpdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpdialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
