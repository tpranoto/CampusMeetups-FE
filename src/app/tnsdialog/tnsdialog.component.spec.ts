import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TnsdialogComponent } from './tnsdialog.component';

describe('TnsdialogComponent', () => {
  let component: TnsdialogComponent;
  let fixture: ComponentFixture<TnsdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TnsdialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TnsdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
